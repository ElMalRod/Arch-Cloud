const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const DirectoryModel = require('../models/directoryModel');


// Ruta para obtener un solo usuario por su _id
router.get('/users/:id', async (req, res) => {
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
});

router.post('/users', async (req, res) => {
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
});


// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find(); // Encuentra todos los documentos en la colección
    res.json(users);
  } catch (error) {
    console.error(`Error al obtener usuarios: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
