const jwt = require("jsonwebtoken");
const { accessTokenSecret, refreshTokenSecret } = require("../config/secrets");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const { prisma } = require("../lib/prisma");
const userSchema = require("../validators/userValidator");
const cookieOptions = require("../utils/cookieOptions");

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
      ...cookieOptions,
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

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      logger.warn("Token refresh attempted without refresh_token cookie", {
        ip: req.ip,
      });
      return next(new CustomError("No refresh token provided", 401));
    }

    const refreshTokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
      logger.warn(
        "Token refresh attempted with expired or invalid refresh token",
        {
          ip: req.ip,
        },
      );
      return next(new CustomError("Refresh token expired or is invalid", 401));
    }

    const payload = jwt.verify(refreshToken, refreshTokenSecret);

    // Issue new tokens
    const { iat, exp, ...userData } = payload;

    const newAccessToken = jwt.sign(userData, accessTokenSecret, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign(userData, refreshTokenSecret, {
      expiresIn: "7d",
    });

    // Update refresh token in database
    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Update refresh token cookie
    res.cookie("refresh_token", newRefreshToken, {
      ...cookieOptions,
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

    logger.warn("Refresh failed", {
      ip: req.ip,
      errorName: error.name,
    });

    return next(new CustomError("Refresh failed", 401));
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
      id: userRecord.id,
      email: userRecord.email,
      role: userRecord.role,
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
    console.error(err);
    logger.warn("Register failed", {
      email: req.body?.email,
      ip: req.ip,
    });
    return next(new CustomError("Register failed", 500));
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;
    if (token) {
      await prisma.refreshToken.delete({ where: { token } }).catch(() => {});

      logger.info("User logout successful", {
        ip: req.ip,
      });
    }

    res.clearCookie("refresh_token", { path: "/api/auth" });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    logger.error("Logout failed with error", {
      ip: req.ip,
      errorMessage: error.message,
    });
    return next(new CustomError("Logout failed", 500));
  }
};

exports.logoutAll = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;
    if (token) {
      const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token },
      });
      if (tokenRecord) {
        await prisma.refreshToken
          .deleteMany({ where: { userId: tokenRecord.userId } })
          .catch(() => {});

        logger.info("User logout-all successful", {
          userId: tokenRecord?.userId,
          ip: req.ip,
        });
      }
    }

    res.clearCookie("refresh_token", { path: "/api/auth" });

    return res.status(200).json({ message: "Logout all successful" });
  } catch (error) {
    logger.error("Logout-all failed with error", {
      ip: req.ip,
      errorMessage: error.message,
    });
    return next(new CustomError("Logout-all failed", 500));
  }
};
