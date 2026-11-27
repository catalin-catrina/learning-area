// Refresh-token cookie settings.
// - httpOnly: page scripts can't read it (an XSS bug can't steal it).
// - secure: only sent over HTTPS (production).
// - sameSite "lax": the browser only sends it to the same site that set it.
//   That works because in production the app and the API share one origin:
//   Vercel proxies /api/* to the API (ui/vercel.json), so the browser never
//   talks to the API's own domain. If you ever call the API directly from
//   another domain, set COOKIE_SAME_SITE=none (and expect browsers that block
//   third-party cookies to sign users out on reload).
const { isProduction } = require("../config/env");

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: process.env.COOKIE_SAME_SITE || "lax",
};

module.exports = cookieOptions;
