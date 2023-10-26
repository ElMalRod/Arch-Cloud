const Directory = require('../models/directoryModel');
const File = require('../models/fileModel');  // Asegúrate de importar el modelo File

// Controlador para crear un nuevo directorio
exports.createDirectory = async (req, res) => {
    try {
        const { name, user_id, parentDirectory_id } = req.body;
    
        // Si se proporciona un ID de directorio padre, verificamos si existe
        let parentDirectory;
        if (parentDirectory_id) {
          parentDirectory = await Directory.findById(parentDirectory_id);
    
          // Si no se encuentra el directorio padre, retornar un error
          if (!parentDirectory) {
            return res.status(404).json({ error: 'Directorio padre no encontrado' });
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
    
        res.json(newDirectory);
      } catch (error) {
        console.error('Error al crear el directorio:', error);
        res.status(500).send('Error interno del servidor');
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
