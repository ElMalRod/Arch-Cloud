const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trashesdirectorySchema = new Schema({
  subdirectory_id: {
    type: Schema.Types.ObjectId,
    ref: 'Directory',
    required: true,
  },
  trashed_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

const TrashesDirectory = mongoose.model('TrashesDirectory', trashesdirectorySchema);

module.exports = TrashesDirectory;
