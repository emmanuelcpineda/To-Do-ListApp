const mongoose = require('mongoose');

//creates user model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please input a valid email address'],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  }

}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);