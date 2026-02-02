const jwt = require("jsonwebtoken");
const users = require("../data/usersData");
const { accessTokenSecret, refreshTokenSecret } = require("../config/secrets");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");
const { blacklistToken } = require("../utils/tokenBlacklist");

/**
 * User login endpoint
 * Generates access token (1h) and refresh token (7d)
 * Refresh token stored in httpOnly cookie (secure against XSS)
 *
 * @param {Object} req - Request with email and password in body
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    logger.warn("Login failed: invalid credentials", {
      email,
      ip: req.ip,
    });
    return next(new CustomError("Invalid credentials", 401));
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only HTTPS in production
    sameSite: "strict",
    path: "/api/auth",
  });

  logger.info("User login successful", {
    userId: user.id,
    email: user.email,
    ip: req.ip,
  });

  res.status(200).json({
    message: "Login successful",
    payload,
    accessToken,
  });
};

/**
 * Refresh token endpoint
 * Takes old refresh token from cookie, validates it, and issues new tokens
 * This enforces token rotation: old refresh token + new refresh token pair
 *
 * @param {Object} req - Request object (refresh_token in cookies)
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
exports.refreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  console.log("refreshToken", refreshToken);

  if (!refreshToken) {
    logger.warn("Token refresh attempted without refresh_token cookie", {
      ip: req.ip,
    });
    return next(new CustomError("No refresh token provided", 401));
  }

  try {
    const payload = jwt.verify(refreshToken, refreshTokenSecret);

    // Issue new tokens
    const { iat, exp, ...userData } = payload;

    const newAccessToken = jwt.sign(userData, accessTokenSecret, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign(userData, refreshTokenSecret, {
      expiresIn: "7d",
    });

    // Update refresh token cookie
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/auth",
    });

    logger.info("Token refreshed successfully", {
      userId: payload.id,
      ip: req.ip,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    // Clear invalid refresh token cookie
    res.clearCookie("refresh_token", { path: "/api/auth" });

    logger.warn("Token refresh failed: invalid or expired refresh token", {
      ip: req.ip,
      errorName: error.name,
    });

    return next(new CustomError("Invalid or expired refresh token", 401));
  }
};

/**
 * Logout endpoint
 * Clears refresh token cookie and blacklists the access token
 * This prevents token reuse even if someone has it
 *
 * Requires: Authorization header with access token
 *
 * @param {Object} req - Request object (must have req.token from verifyToken middleware)
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
exports.logout = (req, res, next) => {
  try {
    // Clear refresh token cookie
    res.clearCookie("refresh_token", { path: "/api/auth" });

    // Blacklist the access token so it can't be used again
    // Pass token expiration time (1h = 3600 seconds)
    if (req.token) {
      blacklistToken(req.token, 3600);
    }

    logger.info("User logout successful", {
      userId: req.user?.id,
      ip: req.ip,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    logger.error("Logout failed with error", {
      userId: req.user?.id,
      ip: req.ip,
      errorMessage: error.message,
    });
    return next(new CustomError("Logout failed", 500));
  }
};
