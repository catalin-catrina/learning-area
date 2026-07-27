const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/register", authController.registerUser);
router.post("/logout", authController.logout);
router.post("/logout-all", authController.logoutAll);

module.exports = router;
