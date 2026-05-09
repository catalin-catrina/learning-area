/**
 * Configuration for JWT secrets
 * In production, these should ALWAYS come from environment variables
 * Never hardcode secrets in version control
 */

const accessTokenSecret = process.env.JWT_ACCESS_SECRET || "your_secret_key";
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";

// Validate that secrets are configured (fail fast on startup)
if (accessTokenSecret === "your_secret_key" || refreshTokenSecret === "your_refresh_secret") {
  console.warn(
    "⚠️  WARNING: Using default JWT secrets. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET environment variables in production!"
  );
}

module.exports = {
  accessTokenSecret,
  refreshTokenSecret,
};
