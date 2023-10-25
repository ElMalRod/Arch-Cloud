const File = require('../models/fileModel');

// Controlador para crear un archivo
exports.createFile = async (req, res) => {
  try {
    const { filename, extension, user_id, path, shared } = req.body;
    const newFile = new File({ filename, extension, user_id, path, shared });
    await newFile.save();

    res.json(newFile);
  } catch (error) {
    console.error('Error al crear el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
};


