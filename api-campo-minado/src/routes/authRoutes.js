const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/reset-password', authController.resetPassword);

// Garanta que essa linha exista no final:
module.exports = router;