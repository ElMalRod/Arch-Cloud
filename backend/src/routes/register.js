const express = require('express');
const router = express.Router();
const UserLoginModel = require('../models/userloginModel');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password, rol } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await UserLoginModel.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      console.log(`El usuario con nombre ${name} o correo electrónico ${email} ya existe.`);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crea un nuevo usuario
    const newUser = new UserLoginModel({ name, email, password, rol });

    // Guarda el nuevo usuario en la base de datos
    await newUser.save();

    console.log(`Usuario registrado con éxito: ${newUser.name}`);
    res.json({ message: 'Registro exitoso', user: newUser });

  } catch (error) {
    console.error(`Error al registrar usuario: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
