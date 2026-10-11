const bcrypt = require("bcrypt");
const userSchema = require("../validators/userValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    return next(new CustomError("Get profile failed", 500));
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const userIdParam = Number(req.params.id);
    if (!Number.isSafeInteger(userIdParam) || userIdParam <= 0) {
      return next(new CustomError("Invalid user ID", 400));
    }

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
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    const { password, ...safeUser } = user;
    res.status(200).json({
      message: "User updated successfully",
      user: safeUser,
    });
  } catch (err) {
    return next(new CustomError("Update user failed", 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return next(new CustomError("Invalid user ID", 400));
    }

    if (req.user.role !== "admin" && userId !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }
    
    await prisma.user.delete({ where: { id: userId } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return next(new CustomError("Delete user failed", 500));
  }
};
