const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/dashboard', userController.getDashboard);
router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateSaldo);
router.delete('/:id', userController.deleteUser);

// ESSA LINHA É A QUE ESTÁ FALTANDO:
module.exports = router;