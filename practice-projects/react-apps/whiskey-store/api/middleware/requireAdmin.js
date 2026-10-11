const CustomError = require("../utils/customError");

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return next(new CustomError("Admin access required", 403));
  }

  next();
}

module.exports = requireAdmin;
