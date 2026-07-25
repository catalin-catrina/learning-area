const jwt = require("jsonwebtoken");
const { accessTokenSecret, refreshTokenSecret } = require("../config/secrets");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");
const { blacklistToken } = require("../utils/tokenBlacklist");
const bcrypt = require("bcrypt");
const { prisma } = require("../lib/prisma");
const userSchema = require("../validators/userValidator");

/**
 * User login endpoint
 * Generates access token (1h) and refresh token (7d)
 * Refresh token stored in httpOnly cookie (secure against XSS)
 *
 * @param {Object} req - Request with email and password in body
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return next(new CustomError("Invalid credentials", 401));

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(new CustomError("Invalid credentials", 401));

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "7d",
    });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
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
  } catch (err) {
    logger.warn("Login failed", {
      email,
      ip: req.ip,
    });
    return next(new CustomError("Login failed", 500));
  }
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

exports.registerUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(new CustomError("Invalid or missing fields", 400));
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
    };

    const userRecord = await prisma.user.create({
      data: newUser,
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "7d",
    });

    const refreshTokenRecord = await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userRecord.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const { password, ...safeUser } = userRecord;

    res.status(201).json({
      message: "User created",
      user: safeUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.warn("Register failed", {
      email: req.body?.email,
      ip: req.ip,
    });
    return next(new CustomError("Register failed", 500));
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
