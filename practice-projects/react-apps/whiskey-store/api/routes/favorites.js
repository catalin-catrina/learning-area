const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const favoritesController = require("../controllers/favoritesController");

router.get("/", verifyToken, favoritesController.getFavorites);
router.get("/:productId", verifyToken, favoritesController.isFavorite);
router.post("/", verifyToken, favoritesController.addFavorite);
router.delete("/:productId", verifyToken, favoritesController.removeFavorite);

module.exports = router;
