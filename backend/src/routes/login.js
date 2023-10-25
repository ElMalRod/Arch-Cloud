const express = require('express');
const router = express.Router();
const UserLoginModel = require('../models/userloginModel');

// Ruta para autenticar un usuario
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Busca un usuario por nombre de usuario o correo electrónico
    const user = await UserLoginModel.findByUsernameOrEmail(identifier);

    // Si no se encuentra el usuario, responde con un mensaje de error
    if (!user) {
     // console.log(`Usuario no encontrado para ${identifier}`);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
   // console.log(`Contraseña almacenada para ${user.name}: ${user.password}`);
   // console.log(`Contraseña almacenada (hex): ${Buffer.from(user.password, 'utf-8').toString('hex')}`);

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isPasswordMatch = await user.comparePassword(password);

    // Si las contraseñas no coinciden, responde con un mensaje de error
    if (!isPasswordMatch) {
    //  console.log(`Contraseña incorrecta para ${user.name}. Contraseña proporcionada: ${password}`);
     // console.log(`Contraseña proporcionada (hex): ${Buffer.from(password, 'utf-8').toString('hex')}`);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // En este punto, la autenticación fue exitosa
   // console.log(`Autenticación exitosa para ${user.name}`);
    res.json({ message: 'Autenticación exitosa', user });

  } catch (error) {
    //console.error(`Error al autenticar usuario: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
