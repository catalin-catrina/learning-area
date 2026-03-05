const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");
const { accessTokenSecret } = require("../config/secrets");

/**
 * Extracts token from Authorization header
 * Expected format: "Bearer <token>"
 *
 * @param {string} authHeader - The Authorization header value
 * @returns {string|null} The extracted token or null
 */
function extractTokenFromHeader(authHeader) {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");

  // Must have exactly 2 parts: "Bearer" and "<token>"
  if (parts.length !== 2) {
    return null;
  }

  const [scheme, token] = parts;

  // Case-insensitive Bearer check (standard practice)
  if (scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}

/**
 * Main middleware for verifying JWT tokens
 *
 * Attaches decoded payload to req.user on success
 * Throws CustomError on failure (caught by global error handler)
 *
 * Usage:
 *   router.get('/protected-route', verifyToken, controller.method)
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function verifyToken(req, res, next) {
  try {
    // Generate unique request ID for tracing through logs
    const requestId =
      req.id || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    req.requestId = requestId;

    const authHeader = req.headers.authorization;

    // ===== STEP 1: Check if Authorization header exists =====
    if (!authHeader) {
      logger.warn("Authentication attempted without Authorization header", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
      });

      // 401 Unauthorized: Authentication credentials are missing or invalid
      return next(
        new CustomError(
          "Authorization header is required. Use format: 'Bearer <token>'",
          401
        )
      );
    }

    // ===== STEP 2: Extract and validate token format =====
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      logger.warn("Malformed Authorization header", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
        authHeader: authHeader.substring(0, 20) + "...", // Log first 20 chars for debugging
      });

      // 401 Unauthorized: Malformed token format
      return next(
        new CustomError(
          "Invalid Authorization header format. Use: 'Bearer <token>'",
          401
        )
      );
    }

    // ===== STEP 3: Check if token is blacklisted (logged out) =====
    if (isTokenBlacklisted(token)) {
      logger.warn("Attempt to use blacklisted token", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
      });

      // 401 Unauthorized: Token has been revoked (e.g., user logged out)
      return next(
        new CustomError("Token has been revoked. Please log in again.", 401)
      );
    }

    // ===== STEP 4: Verify JWT signature and expiration =====
    const payload = jwt.verify(token, accessTokenSecret);

    // ===== STEP 5: Attach decoded payload to request =====
    // This allows controllers to access user info via req.user
    req.user = payload;
    req.token = token; // Sometimes needed for logout (blacklisting)

    logger.debug("Token verified successfully", {
      requestId,
      userId: payload.id,
      endpoint: req.path,
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    });

    next();
  } catch (error) {
    const requestId = req.requestId || `req-${Date.now()}`;

    // ===== ERROR HANDLING: Distinguish between error types =====
    let statusCode = 403;
    let message = "Authentication failed";

    if (error.name === "TokenExpiredError") {
      // 401 Unauthorized: Token is expired (user should refresh)
      statusCode = 401;
      message = `Token has expired. Expired at: ${error.expiredAt.toISOString()}`;

      logger.warn("Token verification failed: token expired", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
        expiredAt: error.expiredAt,
      });
    } else if (error.name === "JsonWebTokenError") {
      // 403 Forbidden: Token signature is invalid (potential tampering)
      statusCode = 403;
      message = "Invalid token signature. Token may have been tampered with.";

      logger.error("Token verification failed: invalid signature", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
        errorMessage: error.message,
      });
    } else if (error.name === "NotBeforeError") {
      // 403 Forbidden: Token used before its valid time (nbf claim)
      statusCode = 403;
      message = "Token is not yet valid";

      logger.warn("Token verification failed: not yet valid", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
      });
    } else {
      // 403 Forbidden: Unknown JWT verification error
      statusCode = 403;
      message = "Token verification failed";

      logger.error("Token verification failed: unknown error", {
        requestId,
        ip: req.ip,
        endpoint: req.path,
        errorName: error.name,
        errorMessage: error.message,
      });
    }

    next(new CustomError(message, statusCode));
  }
}

module.exports = verifyToken;
