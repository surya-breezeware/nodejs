const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { corsOptions } = require('./config/CorsOptions')

// cors

app.use(cors(corsOptions))

// middleware

// built in  middleware to handle urlencoded data
// in other words,for data,
// 'content-type': application/form-urlencoded
app.use(express.urlencoded({ extended: false }))

// built in  middleware for json
app.use(express.json())

app.get('/new', (req, res) => {
  console.log('Hello')
  res.sendFile(path.join(__dirname, 'views', 'new.html'))
})
app.use('/sub', require('./routes/api/employee'))

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

app.listen(3500, () => {
  console.log('server running')
})
