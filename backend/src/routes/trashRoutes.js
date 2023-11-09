const express = require('express');
const router = express.Router();
const trashController = require('../controllers/trashController');

// Ruta para obtener todos los archivos eliminados
router.get('/deleted-files', trashController.getDeletedFiles);

module.exports = router;
