const File = require('../models/fileModel');
const Directory = require('../models/directoryModel');
const SharedFile = require('../models/sharedFileModel');
const User = require('../models/userModel');
const Trash = require('../models/trashModel');


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

// Controlador para compartir un archivo
exports.shareFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { sharedWith } = req.body;

    console.log('File ID:', fileId);
    console.log('Shared With:', sharedWith);

    // Buscar el archivo por su ID
    const file = await File.findById(fileId);
    
    // Validar si el archivo existe
    if (!file) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Agregar el usuario al array de usuarios compartidos
    file.shared_users.push(sharedWith);

    // Guardar los cambios en el archivo
    await file.save();
    console.log('Changes saved to File document');

    // Buscar el ID del usuario compartido
    const sharedUser = await User.findOne({ name: sharedWith });

    // Validar si el usuario existe
    if (!sharedUser) {
      return res.status(404).json({ error: 'Usuario con ese nombre no encontrado' });
    }

    // Crear un documento en la colección sharedfiles
    await SharedFile.create({
      file_id: fileId,
      shared_with: sharedUser._id, // Guardar el ID del usuario compartido
    });
    console.log('SharedFile document created');
    res.json({ message: 'Archivo compartido exitosamente' });
  } catch (error) {
    console.error('Error al compartir el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para obtener archivos compartidos y la información del usuario que los compartió
exports.getSharedFiles = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log('User ID requesting shared files:', userId);

    // Buscar todos los archivos compartidos con el usuario
    const sharedFiles = await SharedFile.find({ shared_with: userId });

    console.log('Shared files found:', sharedFiles);

    // Obtener información del usuario que compartió cada archivo
    const sharedFilesWithUserInfo = await Promise.all(sharedFiles.map(async (sharedFile) => {
      const file = await File.findById(sharedFile.file_id);
      const sharedByUser = await User.findById(file.user_id);

      return {
        file,
        sharedBy: sharedByUser ? sharedByUser.name : 'Desconocido',
      };
    }));

    console.log('Shared files with user info:', sharedFilesWithUserInfo);

    res.json(sharedFilesWithUserInfo);
  } catch (error) {
    console.error('Error al obtener archivos compartidos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    
    // Buscar el archivo por su ID
    const file = await File.findById(fileId);

    // Validar si el archivo existe
    if (!file) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Cambiar el estado del archivo a "eliminado"
    file.deleted = true;
    await file.save();

    // Buscar y eliminar cualquier documento existente en la colección "trash" con el mismo fileId
    await Trash.findOneAndDelete({ file_id: fileId });

    // Crear un documento en la colección "trash"
    await Trash.create({
      filename: file.filename,
      extension: file.extension,
      user_id: file.user_id,
      content: file.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    res.status(500).send('Error interno del servidor');
  }
};
