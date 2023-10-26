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

// Controlador para eliminar un archivo y enviarlo a la papelera
exports.deleteFileToTrash = async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Buscar el archivo que se va a eliminar
    const fileToDelete = await File.findById(fileId);

    // Si el archivo no existe, devolver un error
    if (!fileToDelete) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    // Crear un nuevo documento Trash y copiar la información del archivo a la papelera
    const newTrashFile = new Trash({
      filename: fileToDelete.filename,
      extension: fileToDelete.extension,
      user_id: fileToDelete.user_id,
      path: fileToDelete.path,
      createdAt: fileToDelete.createdAt,
      updatedAt: fileToDelete.updatedAt
    });

    // Guardar el archivo en la colección 'trash'
    await newTrashFile.save();

    // Eliminar el archivo de la colección 'files'
    await File.findByIdAndDelete(fileId);

    res.json({ message: 'Archivo enviado a la papelera exitosamente' });
  } catch (error) {
    console.error('Error al eliminar archivo a la papelera:', error);
    res.status(500).send('Error interno del servidor');
  }
};
