const express = require('express')
const router = express.Router()
const { FusionAuthClient } = require('fusionauth-node-client')
var session = require('express-session')
const {
  fusionAuthController,
} = require('../../controllers/fusionAuthController')

const client = new FusionAuthClient(
  '8m8ehMktV4zeWAvvqI_mK_mMHUXer247nd06kdhvN2k75wz4o2E5WS2F',
  'http://localhost:9011',
)

router.use('/', fusionAuthController)

module.exports = router
