const express = require('express')
const router = express.Router()
const { FusionAuthClient } = require('fusionauth-node-client')

const client = new FusionAuthClient(
  '8m8ehMktV4zeWAvvqI_mK_mMHUXer247nd06kdhvN2k75wz4o2E5WS2F',
  'http://localhost:9011',
)

const fusionAuthController = (req, res) => {
  console.log(req.session.user)
  if (req.session.user) {
    console.log('user: ', req.session.user)
    res.send('We already have a user')
  } else {
    const obj = {
      loginId: 'akash@breezeware.net',
      password: 'breeze123',
      applicationId: '8aaf65e1-9506-46c8-a166-868114f066ee',
    }

    client
      .login(obj)
      .then((clientResponse) => {
        req.session.user = clientResponse.successResponse.user
        req.session.token = clientResponse.successResponse.token
        console.log(JSON.stringify(clientResponse.successResponse, null, 8))
        res.redirect('/profile')
      })
      .catch(function (error) {
        console.log('ERROR: ', JSON.stringify(error))
        res.send('Login failure')
      })
  }
}

module.exports = { fusionAuthController }
