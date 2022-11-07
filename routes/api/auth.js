const express = require('express')
const path = require('path')
const { authController } = require('../../controllers/authController')
const {
  employeeDetails,
  createNewEmployee,
} = require('../../controllers/employeeDetails')
const { handleNewUser } = require('../../controllers/registerController')
const router = express.Router()

router.post('/login', authController).post('/create', createNewEmployee)

module.exports = router
