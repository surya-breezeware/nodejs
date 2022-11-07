const UserDB = require('../data/User')

const fspromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.sendStatus(401)
  }
  console.log(cookies.jwt)
  const refreshToken = cookies.jwt

  const foundUser = await UserDB.findOne({ refreshToken }).exec()

  if (!foundUser) return res.sendStatus(401)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.userName !== decoded.userName) {
      return res.sendStatus(403)
    }
    const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign(
      {
        userInfo: {
          userName: foundUser.userName,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30s',
      },
    )

    res.json({ accessToken })
  })
}

module.exports = { refreshTokenHandler }
