/*****  index.js — chunk #1 *****/
require("dotenv").config(); // 1 – load .env

const express = require("express");
const session = require("express-session");
const { auth } = require("express-openid-connect");

const app = express();

// 2 – secure session cookie (SameSite=Lax keeps CSRF risk low on same-origin SPA)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: "lax", secure: true },
  })
);

// 3 – OIDC / OAuth 2.0 config for Azure Entra ID
app.use(
  auth({
    issuerBaseURL: `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0`,
    clientID: process.env.BFF_CLIENT_ID,
    clientSecret: process.env.BFF_CLIENT_SECRET,

    authorizationParams: {
      scope: `openid profile ${process.env.API_CLIENT_ID}/user_impersonation offline_access`,
      // offline_access ⇒ get a refresh token so the server can renew silently
    },

    // Friendly route paths
    routes: {
      login: "/login", // user starts here
      callback: "/auth/redirect", // must match Azure redirect URI
      postLogoutRedirect: "/",
    },
  })
);

// 4 – health-check route (unprotected)
app.get("/ping", (_, res) => res.send("bff up"));

app.listen(3000, () =>
  console.log("🔐 BFF listening on https://localhost:3000")
);
