// ─────────────────────────  erste.js  ─────────────────────────
//  Erste Group – Sandbox AIS (Wallet flow, no browser redirect)
//----------------------------------------------------------------
//  Flow
//   • POST  /sandbox-idp/wallets/{walletId}/tokens   → accessToken
//   • Cache token in Postgres  (table bank_consents)
//   • GET   /aisp/accounts  (mTLS + Bearer + wallet-id + web-api-key)
//----------------------------------------------------------------
//  ENV  ─────────────────────────────────────────────────────────
//   ERSTE_API_KEY           shared Web‑API‑Key
//   ERSTE_CLIENT_ID         from portal
//   ERSTE_CLIENT_SECRET     from portal
//   ERSTE_WALLET_ID         wallet id you created
//   ERSTE_WALLET_SECRET     wallet secret
//   ERSTE_QWAC_PASS         key passphrase (optional)
//   PG_CONN                 postgres connection string
//----------------------------------------------------------------

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const dayjs = require("dayjs");
const { Pool } = require("pg");

// ─── ENV -------------------------------------------------------
const {
  ERSTE_API_KEY,
  ERSTE_CLIENT_ID,
  ERSTE_CLIENT_SECRET,
  ERSTE_WALLET_ID,
  ERSTE_WALLET_SECRET,
  ERSTE_QWAC_PASS,
  PG_CONN,
} = process.env;

if (!ERSTE_WALLET_ID || !ERSTE_WALLET_SECRET)
  throw new Error("➡️  Add ERSTE_WALLET_ID & ERSTE_WALLET_SECRET to .env");

// ─── mTLS agent ------------------------------------------------
const httpsAgent = new https.Agent({
  cert: fs.readFileSync(path.join(__dirname, "../certs/erste/qwac.pem")),
  key: fs.readFileSync(path.join(__dirname, "../certs/erste/qwac.key")),
  passphrase: ERSTE_QWAC_PASS || undefined,
});

// ─── Postgres --------------------------------------------------
const db = new Pool({ connectionString: PG_CONN });

async function ensureTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS bank_consents (
      provider      TEXT      NOT NULL,
      wallet_id     TEXT      NOT NULL,
      access_token  TEXT      NOT NULL,
      expires_at    TIMESTAMPTZ,
      created_at    TIMESTAMPTZ DEFAULT now(),
      PRIMARY KEY (provider, wallet_id, created_at)
    );
    CREATE INDEX IF NOT EXISTS bank_consents_provider_idx ON bank_consents(provider);
  `);
}

// ─── Constants -------------------------------------------------
const ACCOUNTS_URL =
  "https://webapi.developers.erstegroup.com/api/egb/sandbox/v1/aisp/v1/accounts";
const TOKEN_URL = `https://webapi.developers.erstegroup.com/api/egb/sandbox/v1/sandbox-idp/wallets/${ERSTE_WALLET_ID}/tokens`;

// ─── Token helpers --------------------------------------------
async function fetchStoredToken() {
  const { rows } = await db.query(
    `SELECT access_token, expires_at
       FROM bank_consents
      WHERE provider = 'erste' AND wallet_id = $1
   ORDER BY created_at DESC
      LIMIT 1`,
    [ERSTE_WALLET_ID]
  );
  if (!rows.length) return null;
  if (dayjs(rows[0].expires_at).isBefore(dayjs().add(30, "seconds")))
    return null;
  return rows[0].access_token;
}

async function storeToken(token, expiresIn) {
  const expiresAt = dayjs().add(expiresIn, "seconds").toISOString();
  await db.query(
    `INSERT INTO bank_consents(provider,wallet_id,access_token,expires_at)
         VALUES('erste',$1,$2,$3)`,
    [ERSTE_WALLET_ID, token, expiresAt]
  );
}

async function requestNewToken() {
  try {
    const { data } = await axios.post(
      TOKEN_URL,
      {
        clientId: ERSTE_CLIENT_ID,
        clientSecret: ERSTE_CLIENT_SECRET,
        walletSecret: ERSTE_WALLET_SECRET,
      },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          "X-Request-ID": crypto.randomUUID(),
        },
      }
    );
    await storeToken(data.accessToken, data.expiresIn);
    console.log("🔑  New Erste token stored, expires in", data.expiresIn, "s");
    return data.accessToken;
  } catch (err) {
    console.error(
      "Erste token request failed →",
      err.response?.data || err.message
    );
    throw err;
  }
}

// ─── Express setup --------------------------------------------
const app = express();

app.get("/erste/accounts", async (_req, res) => {
  try {
    const token = (await fetchStoredToken()) || (await requestNewToken());

    const { data } = await axios.get(ACCOUNTS_URL, {
      httpsAgent,
      headers: {
        Authorization: `Bearer ${token}`,
        "web-api-key": ERSTE_API_KEY,
        "wallet-id": ERSTE_WALLET_ID,
        "X-Request-ID": crypto.randomUUID(),
      },
    });

    res.json(data);
  } catch (err) {
    console.error("Erste /accounts error →", err.response?.data || err.message);
    res.status(500).json({
      error: "failed to fetch accounts",
      details: err.response?.data || err.message,
    });
  }
});

// ─── Start -----------------------------------------------------
ensureTable()
  .then(() => {
    app.listen(3000, () =>
      console.log("Erste sandbox up → http://localhost:3000/erste/accounts")
    );
  })
  .catch((e) => {
    console.error("Failed to init DB", e);
    process.exit(1);
  });
