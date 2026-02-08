const CustomError = require("../../../ecommerce-app/ecommerce-api/utils/customError");
const { accessTokenSecret } = require("../config/secrets");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return next(new CustomError("Missing access token", 401));
  }

  try {
    const payload = jwt.verify(accessToken, accessTokenSecret);
    req.user = payload;
    next();
  } catch (error) {
    return next(new CustomError("Invalid or expired token", 401));
  }
};
