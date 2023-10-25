const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Rutas para archivos
router.post('/create', fileController.createFile);


module.exports = router;
