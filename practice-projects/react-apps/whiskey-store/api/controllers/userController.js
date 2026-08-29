const bcrypt = require("bcrypt");
const userSchema = require("../validators/userValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.json(user);
  } catch (err) {
    return next(new CustomError("Get profile failed", 500));
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const userIdParam = parseInt(req.params.id);

    if (userIdParam !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }

    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return next(new CustomError("Invalid fields", 400));
    }

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userIdParam },
      data: value,
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    return next(new CustomError("Update user failed", 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    if (req.user.role !== "admin" && req.query.userId !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }
    
    await prisma.user.delete({ where: { id: userId } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return next(new CustomError("Delete user failed", 500));
  }
};
