const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');

// Obtener subdirectorios de un directorio específico
router.get('/subdirectories/:userId/:directoryId', directoryController.getSubdirectoriesFromDirectory);

// Obtener todos los directorios de un usuario
router.get('/:user_id', directoryController.getAllDirectories);

// Crear un nuevo directorio
router.post('/', directoryController.createDirectory);

module.exports = router;
