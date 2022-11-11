const express = require('express')
const path = require('path')
const { authController } = require('../../controllers/authController')
const {
  employeeDetails,
  updateEmployee,
} = require('../../controllers/employeeDetails')
const { handleNewUser } = require('../../controllers/registerController')
const router = express.Router()
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.use('/display', employeeDetails)

router.use('/new', handleNewUser)

router.put('/update', updateEmployee)

router.route('/employeess').get(verifyRoles(ROLES_LIST.Admin), employeeDetails)
module.exports = router
