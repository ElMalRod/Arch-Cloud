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
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Trash = mongoose.model('trash', trashSchema);

module.exports = Trash;
