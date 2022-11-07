const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
})

module.exports = mongoose.model('User', userSchema)
