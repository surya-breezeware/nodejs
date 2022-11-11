require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { corsOptions } = require('./config/CorsOptions')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const mongoose = require('mongoose')
var session = require('express-session')
const credentials = require('./middleware/credentials')
const bodyParser = require('body-parser')
const connectDB = require('./config/dbConnection')
const User = require('./data/User')

//Connect db

connectDB()

app.use(bodyParser.urlencoded({ extended: true }))
// const url = 'mongodb://localhost/nodejs'

// mongoose.connect(url)

// const connection = mongoose.connection

// connection.on('open', () => {
//   console.log('Connected')
// })

// const users = new user({
//   userId: 1,
//   name: 'surya',
//   email: 'surya@breezeware.net',
// })

// try {
//   const userRes = users.save()
//   console.log(userRes)
// } catch (err) {
//   console.log(err)
// }

// Retrieve User by Email Address
// client.retrieveUserByEmail('karthik@breezeware.net').then(handleResponse)

// function handleResponse(clientResponse) {
//   console.info(JSON.stringify(clientResponse.successResponse.user, null, 2))
// }

// cors
app.use(credentials)
app.use(cors(corsOptions))

// middleware

// built in  middleware to handle urlencoded data
// in other words,for data,
// 'content-type': application/form-urlencoded
app.use(express.urlencoded({ extended: false }))

// built in  middleware for json
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: 'fusio',
    resave: false,
    saveUninitialized: true,
  }),
)

app.get('/new', (req, res) => {
  console.log('Hello')
  res.sendFile(path.join(__dirname, 'views', 'new.html'))
})
// app.use('/login', require('./routes/api/fusionAuth'))

app.get('/profile', function (req, res) {
  if (!req.session.user) {
    res.send('Login required')
  } else {
    res.send('Profile')
  }
})
app.use('/', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))

app.use('/logout', require('./routes/api/logout'))
// app.use(verifyJWT)

app.use('/employee', require('./routes/api/employee'))

// routes

// const one = (res, req, next) => {
//   console.log('one')
//   next()
// }
// const two = (res, req, next) => {
//   console.log('two')
//   next()
// }
// const three = (req, res) => {
//   console.log('three')
//   res.send('Finished!')
// }

// app.get('/chain', [one, two, three])

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

mongoose.connection.once('open', () => {
  console.log('connected to mongoDb')
  app.listen(3500, () => {
    console.log('server running')
  })
})

// User.createCollection().then(function (collection) {
//   console.log('Collection is created!')
// })
