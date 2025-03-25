const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Protected route to get the profile of the logged-in user
router.get('/profile', verifyToken, userController.getProfile);
router.put('/:id', verifyToken, userController.editUser);
router.delete('/:id', verifyToken, userController.deleteUser);

// Other user routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.registerUser);

module.exports = router;
