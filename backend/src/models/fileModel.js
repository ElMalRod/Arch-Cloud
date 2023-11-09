const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
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
  },
  shared: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  directory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directory',
    required: true,
  },
  shared_users: {
    type: [String],  
    default: [],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
