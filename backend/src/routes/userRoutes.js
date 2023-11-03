// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.post('/change-password', UserController.changePassword);

module.exports = router;
