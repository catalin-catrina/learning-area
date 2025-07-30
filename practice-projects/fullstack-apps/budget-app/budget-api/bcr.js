// ─────────────────────────  erste.js  ─────────────────────────
// BCR Romania sandbox – minimal AIS PoC
//---------------------------------------------------------------
// 1. mTLS + API-key for every bank call
// 2. OAuth PKCE (no /consents; direct SCA screen)
// 3. Token swap via /sandbox-idp/token (requires client_secret)
// 4. Tokens saved to Postgres; test route /erste/accounts/:state
//----------------------------------------------------------------

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const qs = require("qs");
const { v4: uuid } = require("uuid");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

// ─── mTLS agent -------------------------------------------------
const httpsAgent = new https.Agent({
  cert: fs.readFileSync(path.join(__dirname, "../certs/bcr/qwac.pem")),
  key: fs.readFileSync(path.join(__dirname, "../certs/bcr/qwac.key")),
  passphrase: process.env.BCR_QWAC_PASS || undefined,
});

// ─── Postgres ---------------------------------------------------
const db = new Pool({ connectionString: process.env.PG_CONN });

// ─── Bank URLs --------------------------------------------------
const AUTH_URL =
  "https://webapi.developers.erstegroup.com/api/bcr/sandbox/v1/sandbox-idp/auth";
const TOKEN_URL =
  "https://webapi.developers.erstegroup.com/api/bcr/sandbox/v1/sandbox-idp/token";
const ACCOUNTS_URL =
  "https://webapi.developers.erstegroup.com/api/bcr/sandbox/v1/aisp/v1/accounts";
const FUNDS_CONFIRM_URL =
  "https://webapi.developers.erstegroup.com/api/bcr/sandbox/v1/piisp/v1/funds-confirmations";

// ─── Express setup ---------------------------------------------
const app = express();
app.use(express.json());
const SESS = {};

// ────────────────────────────────────────────────────────────────
// 1.  /bcr/connect → redirect user to BCR login
// ────────────────────────────────────────────────────────────────
app.get("/bcr/connect", (req, res) => {
  const scopeParam = "AISP PIISP";

  const state = uuid();
  const verifier = crypto.randomBytes(32).toString("hex");
  const challenge = crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");

  SESS[state] = { verifier };

  const authURL =
    AUTH_URL +
    "?" +
    qs.stringify({
      client_id: process.env.BCR_CLIENT_ID,
      redirect_uri: process.env.BCR_REDIRECT_URI,
      response_type: "code",
      access_type: "offline",
      scope: scopeParam,
      code_challenge: challenge,
      code_challenge_method: "S256",
      state,
    });

  res.redirect(authURL);
});

// ────────────────────────────────────────────────────────────────
// 2.  /bcr/callback → swap code for tokens → store in Postgres
// ────────────────────────────────────────────────────────────────
app.get("/bcr/callback", async (req, res) => {
  const { code, state } = req.query;
  if (!SESS[state]) return res.status(400).send("unknown state");

  try {
    console.log("\n↗  POST", TOKEN_URL, "(query-string style)");

    const { data } = await axios.post(
      TOKEN_URL,
      null, // <-- NO BODY
      {
        httpsAgent,
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.BCR_REDIRECT_URI,
          client_id: process.env.BCR_CLIENT_ID,
          client_secret: process.env.BCR_CLIENT_SECRET,
          code_verifier: SESS[state].verifier,
          scope: "AISP PIISP",
        },
        headers: {
          "x-mockbox-debug": "true",
        },
      }
    );

    console.log("↘  Response:", data);

    await db.query(
      `INSERT INTO bank_consents
         (state, wallet_id, access_token, refresh_token, expires_at)
       VALUES ($1, NULL, $2, $3, now() + ($4 || ' seconds')::interval)`,
      [state, data.access_token, data.refresh_token, data.expires_in]
    );

    res.send("✅ Bank connection saved — you may close this tab.");
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).send("Token exchange failed");
  }
});

//  /bcr/accounts/:state
app.get("/bcr/accounts/:state", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT access_token FROM bank_consents WHERE state = $1",
      [req.params.state]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({
        error: "Bank consent not found. Please reconnect your bank account.",
      });
    }

    const accessToken = rows[0].access_token;

    console.log("Using full access token from DB for AISP call.");

    // 2. Build the request
    const response = await axios.get(ACCOUNTS_URL, {
      httpsAgent,
      headers: {
        Authorization: `Bearer ${accessToken}`, // full Base64 string
        "web-api-key": process.env.BCR_API_KEY,
        "x-request-id": crypto.randomUUID(),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    // 3. Success! Return the data from the bank.
    res.status(response.status).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Bank API Error:",
      JSON.stringify(
        {
          status: error.response?.status,
          headers: error.response?.headers,
          data: error.response?.data,
          request: {
            method: error.config?.method,
            url: error.config?.url,
            headers: {
              ...error.config?.headers,
              Authorization: "Bearer [REDACTED]",
            },
          },
        },
        null,
        2
      )
    );

    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      success: false,
      error: error.response?.data || { message: error.message },
    });
  }
});

// ────────────────────────────────────────────────────────────────
// 4.  /bcr/funds/:state  →  PIISP “confirmation of funds”
//      body: { iban, currency, amount }
// ────────────────────────────────────────────────────────────────
app.post("/bcr/funds/:state", async (req, res) => {
  const {
    cardNumber = "12345678901234", // dummy PAN for sandbox
    account: { iban } = {},
    instructedAmount: { currency, amount } = {},
  } = req.body || {};

  if (!iban || !currency || !amount) {
    return res.status(400).json({
      error:
        "Body must be { cardNumber, account:{iban}, instructedAmount:{currency,amount} }",
    });
  }

  try {
    // 1.  get access-token stored earlier
    const { rows } = await db.query(
      "SELECT access_token FROM bank_consents WHERE state = $1",
      [req.params.state]
    );
    if (!rows.length)
      return res.status(404).json({ error: "bank consent not found" });
    const accessToken = rows[0].access_token;

    // 2.  build the PIISP payload (Berlin-Group spec)
    const payload = {
      cardNumber,
      account: { iban },
      instructedAmount: {
        currency,
        amount: String(amount), // API wants a *string*
      },
    };

    // 3.  fire the POST
    const r = await axios.post(FUNDS_CONFIRM_URL, payload, {
      httpsAgent,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "web-api-key": process.env.BCR_API_KEY,
        "x-request-id": crypto.randomUUID(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // 4.  forward raw answer for debugging
    return res.status(r.status).json({ success: true, data: r.data });
  } catch (err) {
    console.error("PIISP error:", err.response?.data || err.message);
    return res
      .status(err.response?.status || 500)
      .json({ success: false, error: err.response?.data || err.message });
  }
});

// ─── boot -------------------------------------------------------
app.listen(3000, () => console.log("➡  http://localhost:3000/bcr/connect"));
