const express = require('express')
const path = require('path')
const { authController } = require('../../controllers/authController')
const { employeeDetails } = require('../../controllers/employeeDetails')
const { handleNewUser } = require('../../controllers/registerController')
const router = express.Router()

router.post('/', authController)

module.exports = router
