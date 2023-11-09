const File = require('../models/fileModel');
const Trash = require('../models/trashModel');


exports.getDeletedFiles = async (req, res) => {
  try {
    // Buscar todos los archivos marcados como "eliminados"
    const deletedFiles = await File.find({ deleted: true });

    res.json(deletedFiles);
  } catch (error) {
    console.error('Error al obtener archivos eliminados:', error);
    res.status(500).send('Error interno del servidor');
  }
};

