const userDB = {
  users: require('../data/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

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

  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken,
  )

  const currentUser = { ...foundUser, refreshToken: '' }
  userDB.setUsers([...otherUsers, currentUser])
  await fspromises.writeFile(
    path.join(__dirname, '..', 'data', 'users.json'),
    JSON.stringify(userDB.users),
  )

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.sendStatus(204)
}

module.exports = { handleLogout }
