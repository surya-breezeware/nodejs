const express = require('express')
const { handleLogout } = require('../../controllers/logoutController')
const { refreshTokenHandler } = require('../../controllers/refreshToken')
const router = express.Router()
// const refreshTokenHandler=require('../../controllers/refreshToken')

router.get('/', handleLogout)

module.exports = router
