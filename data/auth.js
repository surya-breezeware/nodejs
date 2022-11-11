const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auth = new Schema({
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

module.exports = mongoose.model('Crud-Auth', auth)
