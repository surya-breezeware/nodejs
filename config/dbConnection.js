const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: 'crud',
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
