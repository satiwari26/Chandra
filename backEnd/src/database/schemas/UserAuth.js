const mongoose = require('mongoose');

const userAuth = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    required: true
  }
});

const UserAuth = mongoose.model('User', userAuth);

module.exports = UserAuth;
