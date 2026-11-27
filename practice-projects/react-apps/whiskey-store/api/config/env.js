// Every setting that differs between your laptop and production, read once
// at startup. A missing required value stops the server with a clear message,
// instead of failing later on the first request that needs it.
//
// Locally these come from api/.env (see .env.example). In production they are
// set in the hosting dashboard (Render → your service → Environment).

const isProduction = process.env.NODE_ENV === "production";

const required = ["DATABASE_URL", "STRIPE_SECRET_KEY"];
// Locally you can run without a webhook secret (payments just won't be marked
// PAID unless `stripe listen` is running). In production it must exist.
if (isProduction) required.push("STRIPE_WEBHOOK_SECRET", "CLIENT_URL");

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing environment variables: ${missing.join(", ")}. See api/.env.example.`);
}

// CLIENT_URL: where the React app is served, no trailing slash.
// Several are allowed, comma-separated (e.g. the custom domain + the
// *.vercel.app address). The first one is used to build links back to the app.
const clientUrls = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

module.exports = {
  isProduction,
  port: Number(process.env.PORT) || 3000, // hosts like Render set PORT themselves
  clientUrls,
  clientUrl: clientUrls[0],
};
