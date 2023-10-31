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
router.post('/save/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { content } = req.body;

    // Buscar el archivo por su ID
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Actualizar el contenido del archivo
    file.content = content;
    await file.save();

    res.json({ message: 'Contenido guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el contenido:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para obtener un archivo específico por su nombre
router.get('/files/:userId/:filename', async (req, res) => {
  try {
    const userId = req.params.userId;
    const filename = req.params.filename;

    // Buscar todos los directorios del usuario
    const userDirectories = await Directory.find({ user_id: userId });

    // Buscar el archivo por su nombre en los directorios del usuario
    let targetFile = null;

    for (const directory of userDirectories) {
      const filesInDirectory = await File.find({ _id: { $in: directory.files } });

      targetFile = filesInDirectory.find((file) => file.filename === filename);

      if (targetFile) {
        break; // Salir del bucle si se encuentra el archivo
      }
    }

    if (!targetFile) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    res.json(targetFile);
  } catch (error) {
    console.error('Error al obtener el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/directory/:directoryId', async (req, res) => {
  try {
    const directoryId = req.params.directoryId;

    console.log('Directory ID:', directoryId);

    // Buscar todos los archivos en el directorio dado
    const files = await File.find({ directory_id: directoryId });

    console.log('Files found:', files);

    res.json(files);
  } catch (error) {
    console.error('Error al obtener archivos del directorio:', error);
    res.status(500).send('Error interno del servidor');
  }
});



module.exports = router;


