const Trash = require('../models/trashModel');

// Controlador para obtener todos los archivos en la papelera
exports.getAllTrash = async (req, res) => {
  try {
    const trashFiles = await Trash.find();
    res.json(trashFiles);
  } catch (error) {
    console.error('Error al obtener archivos en la papelera:', error);
    res.status(500).send('Error interno del servidor');
  }
};


