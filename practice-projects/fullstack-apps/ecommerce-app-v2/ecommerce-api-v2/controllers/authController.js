const CustomError = require("../../../ecommerce-app/ecommerce-api/utils/customError");
const users = require("../data/usersData");
const { accessTokenSecret, refreshTokenSecret } = require("../config/secrets");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: "1d" });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/",
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth",
  });

  res.status(200).json({
    message: "Login successful",
    payload,
  });
};

exports.refreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return next(new CustomError("Missing refresh token", 401));
  }

  try {
    const payload = jwt.verify(refreshToken, refreshTokenSecret);
    const { iat, exp, ...userData } = payload;

    const accessToken = jwt.sign(userData, accessTokenSecret, {
      expiresIn: "1d",
    });
    const newRefreshToken = jwt.sign(userData, refreshTokenSecret, {
      expiresIn: "7d",
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/",
    });
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/auth",
    });

    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    res.clearCookie("refresh_token", { path: "/api/auth" });
    return next(new CustomError("Invalid or expired refresh token", 401));
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("access_token", { path: "/api/" });
  res.clearCookie("refresh_token", { path: "/api/auth" });

  res.status(200).json({ message: "Logout successful" });
};
