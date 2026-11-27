const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');
const requireAdmin = require('../middleware/requireAdmin');
const reviewController = require('../controllers/reviewController');

router.get('/', productController.getProducts);
router.get('/filters', productController.getFilters);
router.get('/:id', productController.getProductById);

// Reviews: anyone can read; a signed-in user has at most one per product ("me")
router.get('/:id/reviews', reviewController.getReviews);
router.get('/:id/reviews/me', verifyToken, reviewController.getMyReview);
router.put('/:id/reviews/me', verifyToken, reviewController.upsertMyReview);
router.delete('/:id/reviews/me', verifyToken, reviewController.deleteMyReview);
router.post('/', verifyToken, requireAdmin, productController.createProduct);
router.put('/:id', verifyToken, requireAdmin, productController.putProduct);
router.delete('/:id', verifyToken, requireAdmin, productController.deleteProduct);

module.exports = router;
