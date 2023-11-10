const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');

// Obtener subdirectorios de un directorio específico
router.get('/subdirectories/:userId/:directoryId', directoryController.getSubdirectoriesFromDirectory);

// Obtener todos los directorios de un usuario
router.get('/:user_id', directoryController.getAllDirectories);

// Crear subdirectorios a partir de un directorio específico
router.post('/createSubdirectory', directoryController.createSubdirectory);

// Crear directorio
router.post('/', directoryController.createDirectory);

// Copiar Directorio
router.post('/copySubdirectory/:userId/:subdirectoryId', directoryController.copySubdirectory);

// Ruta para mover un subdirectorio
router.post('/moveSubdirectory', directoryController.moveSubdirectory);



module.exports = router;
