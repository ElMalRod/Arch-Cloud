const File = require('../models/fileModel');
const Directory = require('../models/directoryModel');  // Asegúrate de importar el modelo Directory

// Controlador para crear un archivo en un directorio específico
exports.createFile = async (req, res) => {
  try {
    const { filename, extension, user_id, path, shared, content, directory_id } = req.body;

    // Validación: Asegúrate de que el directorio exista
    const directory = await Directory.findById(directory_id);
    if (!directory) {
      return res.status(404).json({ error: 'Directorio no encontrado' });
    }

    // Puedes validar la extensión aquí antes de crear el archivo
    const allowedExtensions = [".txt", ".html"];
    if (!allowedExtensions.includes(extension)) {
      return res.status(400).json({ error: "Extensión no permitida" });
    }

    // Crear un nuevo documento File con contenido y asociarlo al directorio
    const newFile = new File({ filename, extension, user_id, path, shared, content, directory_id });

    // Guardar el archivo en la colección 'files'
    await newFile.save();

    // Añadir el ID del nuevo archivo al directorio
    directory.files.push(newFile._id);
    await directory.save();

    res.json(newFile);
  } catch (error) {
    console.error('Error al crear el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.saveFileContent = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { content } = req.body;

    // Buscar el archivo por ID
    const file = await File.findById(fileId);

    // Validar si el archivo existe
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    // Actualizar el contenido del archivo
    file.content = content;
    await file.save();

    res.json({ message: "Contenido guardado exitosamente" });
  } catch (error) {
    console.error("Error al guardar el contenido:", error);
    res.status(500).send("Error interno del servidor");
  }
};

