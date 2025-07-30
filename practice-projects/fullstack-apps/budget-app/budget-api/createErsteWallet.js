// scripts/createErsteWallet.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const fs = require("fs");
const https = require("https");
const axios = require("axios");

(async () => {
  const httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.join(__dirname, "../certs/erste/qwac.pem")),
    key: fs.readFileSync(path.join(__dirname, "../certs/erste/qwac.key")),
    passphrase: process.env.ERSTE_QWAC_PASS || undefined,
  });

  try {
    const { data } = await axios.post(
      "https://webapi.developers.erstegroup.com/api/egb/sandbox/v1/sandbox-idp/wallets",
      {
        clientId: process.env.ERSTE_CLIENT_ID,
        clientSecret: process.env.ERSTE_CLIENT_SECRET,
      },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          "web-api-key": process.env.ERSTE_API_KEY,
        },
      }
    );
    console.log("\n🎉  Your new wallet credentials:\n", data);
  } catch (err) {
    console.error("Wallet create failed →", err.response?.data || err.message);
  }
})();
