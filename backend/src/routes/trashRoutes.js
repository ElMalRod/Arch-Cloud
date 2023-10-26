const express = require('express');
const router = express.Router();
const trashController = require('../controllers/trashController');

// Rutas para la papelera
router.get('/all', trashController.getAllTrash);


module.exports = router;
