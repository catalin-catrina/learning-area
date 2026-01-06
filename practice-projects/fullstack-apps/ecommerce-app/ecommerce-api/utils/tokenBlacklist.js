/**
 * Simple in-memory token blacklist for managing token revocation
 * When a user logs out, their token is added to this set
 * In production, use Redis with TTL matching token expiration time
 */

const blacklistedTokens = new Set();

/**
 * Add a token to the blacklist (typically on logout)
 * @param {string} token - The JWT token to blacklist
 * @param {number} expiresIn - Seconds until token expires (for cleanup)
 */
function blacklistToken(token, expiresIn = 3600) {
  blacklistedTokens.add(token);

  // Auto-cleanup: remove token from set after it naturally expires
  // In production with Redis, TTL handles this automatically
  setTimeout(() => {
    blacklistedTokens.delete(token);
  }, expiresIn * 1000);
}

/**
 * Check if a token is blacklisted
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if token is blacklisted
 */
function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}

/**
 * Clear all blacklisted tokens (useful for testing)
 */
function clearBlacklist() {
  blacklistedTokens.clear();
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
  clearBlacklist,
};
