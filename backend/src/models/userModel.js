const mongoose = require('mongoose');

// esquema del usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, required: true }
});

// Crea el modelo a partir del esquema
const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
