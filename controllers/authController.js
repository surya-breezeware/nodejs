const UserDB = require('../data/User')

const fspromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const authController = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    return res.status(400).json({ message: 'UserName or Password not found' })
  }
  const foundUser = await UserDB.findOne({ userName }).exec()

  if (!foundUser) return res.sendStatus(401)

  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
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
    const refreshToken = jwt.sign(
      {
        userName: foundUser.userName,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
    )

    // const otherUsers = userDB.users.filter(
    //   (person) => person.userName != foundUser.userName,
    // )

    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    // const currentUser = { ...foundUser, refreshToken }
    // userDB.setUsers([...otherUsers, currentUser])
    // await fspromises.writeFile(
    //   path.join(__dirname, '..', 'data', 'users.json'),
    //   JSON.stringify(userDB.users),
    // )
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true, secure false in postman and secure true in browder or production application
      maxAge: 24 * 60 * 1000,
    })
    res.json({ accessToken, foundUser })
  } else {
    res.status(400).json({ message: 'Incorrect password' })
  }
}

module.exports = { authController }
