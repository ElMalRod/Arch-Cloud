const UserModel = require('../models/userModel');
const DirectoryModel = require('../models/directoryModel');

// Controlador para obtener un solo usuario por su _id
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(`Error al obtener el usuario: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();

    // Crear automáticamente un directorio raíz para el nuevo usuario
    const rootDirectory = new DirectoryModel({
      name: 'Raiz',
      user_id: newUser._id, // Asigna el ID del nuevo usuario
      files: [],
      subdirectories: [],
    });

    await rootDirectory.save();

    res.json({ user: newUser, rootDirectory });
  } catch (error) {
    console.error(`Error al crear un nuevo usuario: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(`Error al obtener usuarios: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para cambiar la contraseña de un usuario
exports.changePassword = async (req, res) => {
  try {
    const { user_id, currentPassword, newPassword } = req.body;

    // Buscar el usuario por su ID
    const user = await UserModel.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña actual
    if (currentPassword !== user.password) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Actualizar la contraseña en la base de datos
    user.password = newPassword;
    
    // Asegurarse de que la contraseña se ha cambiado correctamente
    await user.save();

    // Volver a buscar el usuario después de la actualización
    const updatedUser = await UserModel.findById(user_id);

    res.json({ message: 'Contraseña actualizada con éxito', user: updatedUser });
  } catch (error) {
    console.error(`Error al cambiar la contraseña: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
};
