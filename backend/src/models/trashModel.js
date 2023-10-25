const mongoose = require('mongoose');
const { Schema } = mongoose;

const trashSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  path: {
    type: String,
    required: true,
  }
});

const Trash = mongoose.model('Trash', trashSchema);

module.exports = Trash;
