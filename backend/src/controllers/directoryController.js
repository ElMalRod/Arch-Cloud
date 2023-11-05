const Directory = require('../models/directoryModel');
const mongoose = require('mongoose');
const File = require('../models/fileModel');
// Controlador para crear un nuevo directorio
exports.createDirectory = async (user_id, name, parentDirectory_id) => {
  try {
    let parentDirectory;

    // Si se proporciona un ID de directorio padre, verificamos si existe
    if (parentDirectory_id) {
      parentDirectory = await Directory.findById(parentDirectory_id);

      // Si no se encuentra el directorio padre, lanzar un error
      if (!parentDirectory) {
        throw new Error('Directorio padre no encontrado');
      }
    }

    // Crear un nuevo documento Directory
    const newDirectory = new Directory({ name, user_id });

    // Si hay un directorio padre, lo añadimos a la propiedad subdirectories
    if (parentDirectory) {
      parentDirectory.subdirectories.push(newDirectory._id);
      await parentDirectory.save();
    }

    // Guardar el directorio en la colección 'directories'
    await newDirectory.save();

    return newDirectory;
  } catch (error) {
    throw new Error(`Error al crear el directorio: ${error.message}`);
  }
};

// Controlador para obtener todos los directorios de un usuario
exports.getAllDirectories = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Buscar todos los directorios del usuario
    const directories = await Directory.find({ user_id })
      .populate('files')  // Popula los documentos referenciados en el campo 'files'
      .populate('subdirectories');  // Popula los documentos referenciados en el campo 'subdirectories'

    res.json(directories);
  } catch (error) {
    console.error('Error al obtener directorios:', error);
    res.status(500).send('Error interno del servidor');
  }
};
// subdirectorios a partir de un directorio específico
exports.getSubdirectoriesFromDirectory = async (req, res) => {
  try {
    const userId = req.params.userId; // Puedes obtener el ID del usuario de la solicitud, o de donde lo tengas almacenado
    const directoryId = req.params.directoryId; // ID del directorio específico

    // Función recursiva para obtener subdirectorios
    const getSubdirectoriesRecursive = async (directoryId) => {
      // Buscar el directorio actual
      const currentDirectory = await Directory.findOne({ user_id: userId, _id: directoryId });

      if (!currentDirectory) {
        return [];
      }

      // Obtener subdirectorios del directorio actual
      const subdirectories = await Directory.find({ user_id: userId, _id: { $in: currentDirectory.subdirectories } });

      // Recorrer recursivamente los subdirectorios
      const subdirectoriesWithChildren = await Promise.all(subdirectories.map(async (subdirectory) => {
        const children = await getSubdirectoriesRecursive(subdirectory._id);
        return { ...subdirectory.toObject(), subdirectories: children };
      }));

      return subdirectoriesWithChildren;
    };

    // Llamar a la función recursiva con el directorio raíz
    const subdirectories = await getSubdirectoriesRecursive(directoryId);

    res.json(subdirectories);
  } catch (error) {
    console.error('Error al obtener subdirectorios desde el directorio específico:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Crear subdirectorios a partir de un directorio específico
exports.createSubdirectory = async (req, res) => {
  try {
    const { name, user_id, parentDirectory_id } = req.body;

    // Verificar si el directorio padre existe
    const parentDirectory = await Directory.findOne({ _id: parentDirectory_id, user_id });

    if (!parentDirectory) {
      return res.status(404).json({ message: 'Directorio padre no encontrado' });
    }

    // Crear el nuevo subdirectorio
    const newSubdirectory = new Directory({
      name,
      user_id,
      parentDirectory: parentDirectory._id,
    });

    await newSubdirectory.save();

    // Agregar el nuevo subdirectorio a la lista de subdirectorios del directorio padre
    parentDirectory.subdirectories.push(newSubdirectory._id);
    await parentDirectory.save();

    res.status(201).json(newSubdirectory);
  } catch (error) {
    console.error('Error al crear subdirectorio:', error);
    res.status(500).send('Error interno del servidor');
  }
};

