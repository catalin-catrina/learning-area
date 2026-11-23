const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const addressController = require("../controllers/addressController");

router.get("/", verifyToken, addressController.getAddresses);
router.post("/", verifyToken, addressController.createAddress);
router.put("/:id", verifyToken, addressController.updateAddress);
router.patch("/:id/default", verifyToken, addressController.setDefaultAddress);
router.delete("/:id", verifyToken, addressController.deleteAddress);

module.exports = router;
