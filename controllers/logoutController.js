const UserDB = require('../data/User')

const fspromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.sendStatus(204)
  }
  const refreshToken = cookies.jwt

  const foundUser = userDB.users?.find(
    (person) => person.refreshToken === refreshToken,
  )

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    return res.sendStatus(204)
  }

  foundUser.refreshToken = ''
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.sendStatus(204)
}

module.exports = { handleLogout }
