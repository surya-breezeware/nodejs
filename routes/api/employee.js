const express = require('express')
const path = require('path')
const { viewIndex } = require('../../controllers/Demo')
const router = express.Router()

router.use('/display', viewIndex)

module.exports = router
