const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/profile", verifyToken, userController.getProfile);
router.put("/:id", verifyToken, userController.editUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
