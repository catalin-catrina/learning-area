const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/filters', productController.getFilters);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.putProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
