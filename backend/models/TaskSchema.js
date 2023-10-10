const mongoose = require('mongoose');

//creates task model
const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  toDoTask: {
    type: String,
    required: [true, 'This field is required'],
  },
  remarks: {
    type: String,
    default: 'On going',
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
    required: true,
  }
  
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);