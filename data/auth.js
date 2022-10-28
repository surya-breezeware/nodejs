const mongoose = require('mongoose')

const auth = new mongoose.Schema({
  userId: {
    type: Number,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
})

module.exports = mongoose.model('auth', auth)
