const mongoose = require('mongoose');
const { Schema } = mongoose;

const sharedFileSchema = new Schema({
  file_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',  // Referencia al modelo de archivos
    required: true,
  },
  shared_with: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencia al modelo de usuarios
    required: true,
  },
});

const SharedFile = mongoose.model('sharedfiles', sharedFileSchema);

module.exports = SharedFile;
