const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by id
router.get('/:id', productController.getProductById);

// POST a new product
router.get('/', productController.createProduct);

module.exports = router;