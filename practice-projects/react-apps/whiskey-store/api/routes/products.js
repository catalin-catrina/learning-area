const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/', productController.getProducts);
router.get('/filters', productController.getFilters);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, requireAdmin, productController.createProduct);
router.put('/:id', verifyToken, requireAdmin, productController.putProduct);
router.delete('/:id', verifyToken, requireAdmin, productController.deleteProduct);

module.exports = router;
