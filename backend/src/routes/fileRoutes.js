const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const Directory = require('../models/directoryModel');
const File = require('../models/fileModel');

// Ruta para crear un archivo
router.post('/create', fileController.createFile);

// Ruta para obtener todos los archivos de un usuario
router.get('/files/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Buscar todos los directorios del usuario
    const userDirectories = await Directory.find({ user_id: userId });

    // Obtener todos los IDs de archivos de los directorios del usuario
    const fileIds = userDirectories.reduce((acc, directory) => {
      return acc.concat(directory.files);
    }, []);

    // Buscar todos los archivos con los IDs obtenidos
    const files = await File.find({ _id: { $in: fileIds } });

    res.json(files);
  } catch (error) {
    console.error('Error al obtener archivos del usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para guardar el contenido de un archivo
router.post("/save/:fileId", fileController.saveFileContent);

module.exports = router;
