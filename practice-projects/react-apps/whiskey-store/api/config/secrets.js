/**
 * Configuration for JWT secrets
 * In production, these should ALWAYS come from environment variables
 * Never hardcode secrets in version control
 */

const { JWT_ACCESS_SECRET: accessTokenSecret, JWT_REFRESH_SECRET: refreshTokenSecret } =
  process.env;

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error(
    "JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be configured before starting the API",
  );
}

if (accessTokenSecret.length < 32 || refreshTokenSecret.length < 32) {
  throw new Error("JWT secrets must each be at least 32 characters long");
}

module.exports = {
  accessTokenSecret,
  refreshTokenSecret,
};
