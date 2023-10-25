const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, required: true }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function(candidatePassword) {
  const match = this.password === candidatePassword;
  if (!match) {
    console.log('Contraseñas no coinciden:', candidatePassword, this.password);
  }
  return match;
};

// Método estático para encontrar un usuario por nombre de usuario o correo electrónico
userSchema.statics.findByUsernameOrEmail = function(identifier) {
  return this.findOne({
    $or: [{ name: identifier }, { email: identifier }],
  }).then(user => {
    console.log('Usuario encontrado:', user);
    return user;
  });
};

const UserLoginModel = mongoose.model('User', userSchema);

module.exports = UserLoginModel;
