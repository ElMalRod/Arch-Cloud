const express = require('express');
const router = express.Router();
const trashController = require('../controllers/trashController');
const directoryController = require('../controllers/directoryController');

// Ruta para obtener todos los archivos eliminados
router.get('/deleted-files', trashController.getDeletedFiles);
// Ruta para mover un directorio a la papelera
router.delete('/deleted-directory/:userId/:subdirectoryId', directoryController.moveSubdirectoryToTrash);
// Ruta para ver un directorio em la papelera
router.get('/trashed-directories', directoryController.getTrashedDirectories);


module.exports = router;
