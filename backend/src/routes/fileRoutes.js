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

// Ruta para copiar un archivo
router.post('/copy/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Buscar el archivo por su ID
    const originalFile = await File.findById(fileId);

    if (!originalFile) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Crear una copia del archivo con un nombre diferente
    const copiedFile = new File({
      filename: `${originalFile.filename} - Copia`,
      extension: originalFile.extension,
      user_id: originalFile.user_id,
      path: originalFile.path,
      shared: originalFile.shared,
      content: originalFile.content,
      directory_id: originalFile.directory_id,
    });

    // Guardar la copia en la colección 'files'
    await copiedFile.save();

    // Añadir el ID de la copia al mismo directorio del archivo original
    const directory = await Directory.findById(originalFile.directory_id);
    if (directory) {
      directory.files.push(copiedFile._id);
      await directory.save();
    }

    res.json(copiedFile);
  } catch (error) {
    console.error('Error al copiar el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mover un archivo a un nuevo directorio
router.post('/move/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { newDirectoryId } = req.body;

    // Buscar el archivo por su ID
    const file = await File.findById(fileId);

    // Validar si el archivo existe
    if (!file) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Buscar el directorio actual del archivo
    const currentDirectory = await Directory.findById(file.directory_id);

    // Validar si el directorio actual y el nuevo directorio son diferentes
    if (file.directory_id.toString() === newDirectoryId.toString()) {
      return res.status(400).json({ error: 'El archivo ya está en este directorio' });
    }

    // Quitar el ID del archivo del directorio actual
    currentDirectory.files = currentDirectory.files.filter(id => id.toString() !== fileId.toString());
    await currentDirectory.save();

    // Obtener el nuevo directorio
    const newDirectory = await Directory.findById(newDirectoryId);

    // Validar si el nuevo directorio existe
    if (!newDirectory) {
      return res.status(404).json({ error: 'Nuevo directorio no encontrado' });
    }

    // Añadir el ID del archivo al nuevo directorio
    newDirectory.files.push(file._id);
    await newDirectory.save();

    // Actualizar el ID del directorio del archivo en la base de datos
    file.directory_id = newDirectory._id;
    await file.save();

    res.json({ message: 'Archivo movido exitosamente' });
  } catch (error) {
    console.error('Error al mover el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para compartir un archivo con un usuario específico
router.post('/share/:fileId', fileController.shareFile);
// Ruta para obtener los archivos compartidos y la información del usuario que los compartió
router.get('/shared-files/:userId', fileController.getSharedFiles);
// Ruta para eliminar un archivo
router.delete('/delete/:fileId', fileController.deleteFile);

module.exports = router;


