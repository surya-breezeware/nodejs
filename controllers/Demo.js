const path = require('path')

const viewIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

module.exports = { viewIndex }
