const Directory = require('../models/directoryModel');
const File = require('../models/fileModel');
const User = require('../models/userModel');
const TrashesDirectory = require('../models/trashesdirectoryModel');

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

// Controlador para copiar un subdirectorio y su contenido
exports.copySubdirectory = async (req, res) => {
  try {
    const { userId, subdirectoryId } = req.params;
    const { parentDirectory_id } = req.body;  // Modificado para obtener parentDirectory_id del cuerpo

    // Buscar el subdirectorio por su ID
    const originalSubdirectory = await Directory.findById(subdirectoryId);

    if (!originalSubdirectory) {
      return res.status(404).json({ error: 'Subdirectorio no encontrado' });
    }

    // Obtener el directorio padre del subdirectorio original usando parentDirectory_id
    const parentDirectory = await Directory.findOne({ user_id: userId, _id: parentDirectory_id });

    console.log('ID del subdirectorio original:', subdirectoryId);
    console.log('ID del directorio padre del subdirectorio original:', parentDirectory_id);

    if (!parentDirectory) {
      return res.status(404).json({ error: 'Directorio padre no encontrado' });
    }

    // Crear una copia del subdirectorio con un nombre diferente
    const copiedSubdirectory = new Directory({
      name: `${originalSubdirectory.name} - Copia`,
      user_id: originalSubdirectory.user_id,
      parentDirectory: originalSubdirectory._id,
    });

    // Guardar la copia en la colección 'directories'
    await copiedSubdirectory.save();

    // Añadir el ID de la copia al mismo directorio del subdirectorio original
    parentDirectory.subdirectories.push(copiedSubdirectory._id);
    await parentDirectory.save();

    // Copiar el contenido del subdirectorio (archivos y subdirectorios)
    await copyContents(originalSubdirectory._id, copiedSubdirectory._id);

    res.json(copiedSubdirectory);
  } catch (error) {
    console.error('Error al copiar el subdirectorio:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Función auxiliar para copiar el contenido de un subdirectorio
const copyContents = async (originalSubdirectoryId, copiedSubdirectoryId) => {
  try {
    // Obtener el contenido del subdirectorio original
    const originalSubdirectory = await Directory.findById(originalSubdirectoryId)
      .populate('files')
      .populate('subdirectories');

    // Recorrer y copiar archivos
    for (const originalFileId of originalSubdirectory.files) {
      const originalFile = await File.findById(originalFileId);
      console.log('ID del subdirectorio original (dentro de copyContents):', originalSubdirectoryId);
console.log('ID del subdirectorio copiado (dentro de copyContents):', copiedSubdirectoryId);
console.log('Archivo original:', originalFile);
      const copiedFile = new File({
        filename: `${originalFile.filename} - Copia`,
        extension: originalFile.extension,
        user_id: originalFile.user_id,
        path: originalFile.path,
        shared: originalFile.shared,
        content: originalFile.content,
        directory_id: copiedSubdirectoryId,
      });

      await copiedFile.save();

      // Añadir el ID de la copia al subdirectorio copiado
      const copiedSubdirectory = await Directory.findById(copiedSubdirectoryId);
      copiedSubdirectory.files.push(copiedFile._id);
      await copiedSubdirectory.save();
    }

    // Recorrer y copiar subdirectorios (llamada recursiva)
    for (const originalSubdirectoryId of originalSubdirectory.subdirectories) {
      const newCopiedSubdirectory = new Directory({
        name: `${originalSubdirectory.name} - Copia`,
        user_id: originalSubdirectory.user_id,
        parentDirectory: copiedSubdirectoryId,
      });

      await newCopiedSubdirectory.save();

      // Añadir el ID de la copia al subdirectorio copiado
      const copiedSubdirectory = await Directory.findById(copiedSubdirectoryId);
      copiedSubdirectory.subdirectories.push(newCopiedSubdirectory._id);
      await copiedSubdirectory.save();

      // Llamada recursiva para copiar el contenido del subdirectorio
      await copyContents(originalSubdirectoryId, newCopiedSubdirectory._id);
    }
  } catch (error) {
    console.error('Error al copiar contenido del subdirectorio:', error);
  }
};

exports.moveSubdirectory = async (req, res) => {
  try {
    const { userId, subdirectoryId, newParentDirectoryId } = req.body;

    // Buscar el subdirectorio por su ID
    const originalSubdirectory = await Directory.findById(subdirectoryId);

    if (!originalSubdirectory) {
      return res.status(404).json({ error: 'Subdirectorio no encontrado' });
    }

    // Obtener el directorio padre actual del subdirectorio
    const currentParentDirectory = await Directory.findOne({ user_id: userId, subdirectories: subdirectoryId });

    if (!currentParentDirectory) {
      return res.status(404).json({ error: 'Directorio padre actual no encontrado' });
    }

    // Obtener el directorio padre del subdirectorio original usando newParentDirectoryId
    const newParentDirectory = await Directory.findOne({ user_id: userId, _id: newParentDirectoryId });

    if (!newParentDirectory) {
      return res.status(404).json({ error: 'Nuevo directorio padre no encontrado' });
    }

    // Eliminar el ID del subdirectorio del directorio padre actual
    currentParentDirectory.subdirectories = currentParentDirectory.subdirectories.filter(id => id.toString() !== subdirectoryId);
    await currentParentDirectory.save();

    // Agregar el ID del subdirectorio al nuevo directorio padre
    newParentDirectory.subdirectories.push(subdirectoryId);
    await newParentDirectory.save();

    res.json(originalSubdirectory);
  } catch (error) {
    console.error('Error al mover el subdirectorio:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para mover un directorio a la papelera
exports.moveSubdirectoryToTrash = async (req, res) => {
  try {
    const { userId, subdirectoryId } = req.params;

    // Buscar el subdirectorio por su ID
    const originalSubdirectory = await Directory.findById(subdirectoryId);

    if (!originalSubdirectory) {
      return res.status(404).json({ error: 'Subdirectorio no encontrado' });
    }

    // Obtener el directorio padre actual del subdirectorio
    const currentParentDirectory = await Directory.findOne({ user_id: userId, subdirectories: subdirectoryId });

    if (!currentParentDirectory) {
      return res.status(404).json({ error: 'Directorio padre actual no encontrado' });
    }

    // Eliminar el ID del subdirectorio del directorio padre actual
    currentParentDirectory.subdirectories = currentParentDirectory.subdirectories.filter(id => id.toString() !== subdirectoryId);
    await currentParentDirectory.save();

    // Crear un documento en la colección 'trashesdirectory'
    await TrashesDirectory.create({
      subdirectory_id: subdirectoryId,
      trashed_by: userId,
    });

    // Puedes agregar lógica adicional aquí para manejar la eliminación de archivos asociados, si es necesario.

    res.json(originalSubdirectory);
  } catch (error) {
    console.error('Error al mover el subdirectorio a la papelera:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.getTrashedDirectories = async (req, res) => {
  try {
    const trashedDirectories = await TrashesDirectory.find();

    const trashedDirectoriesInfo = await Promise.all(trashedDirectories.map(async (trashedDirectory) => {
      try {
        const directory = trashedDirectory.subdirectory_id
          ? await Directory.findById(trashedDirectory.subdirectory_id)
          : null;

        if (!directory) {
          console.error('Subdirectorio no encontrado para el trashedDirectory:', trashedDirectory);
          return {
            trashedDirectory,
            directoryInfo: {
              directory: null,
              subdirectories: [],
              files: [],
            },
          };
        }

        // Utilizar populate para obtener automáticamente subdirectorios y archivos
        const directoryInfo = await Directory.populate(directory, { path: 'subdirectories files' });

        return {
          trashedDirectory: {
            ...trashedDirectory.toObject(),
            deletedAt: directoryInfo.deletedAt,
          },
          directoryInfo,
        };
      } catch (error) {
        console.error('Error al obtener información detallada para el trashedDirectory:', error);
        return {
          trashedDirectory,
          directoryInfo: {
            directory: null,
            subdirectories: [],
            files: [],
          },
        };
      }
    }));

    res.json(trashedDirectoriesInfo);
  } catch (error) {
    console.error('Error al obtener subdirectorios movidos a la papelera:', error);
    res.status(500).send('Error interno del servidor');
  }
};
