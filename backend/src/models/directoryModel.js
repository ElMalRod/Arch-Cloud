const mongoose = require('mongoose');
const { Schema } = mongoose;

const directorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  }],
  subdirectories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directory',
  }],
});

const Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;
