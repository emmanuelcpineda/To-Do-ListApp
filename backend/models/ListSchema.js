const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },

}, {timestamps: true});

module.exports = mongoose.model('List', ListSchema);