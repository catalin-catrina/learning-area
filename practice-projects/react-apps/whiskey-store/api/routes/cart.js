const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, cartController.getCart);
router.post("/items", verifyToken, cartController.addItem);
router.patch(
  "/items/:productId",
  verifyToken,
  cartController.updateItemQuantity,
);
router.delete("/items/:productId", verifyToken, cartController.removeItem);

module.exports = router;
