const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    default: 'My List'
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
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