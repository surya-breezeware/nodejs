const bcrypt = require('bcrypt')
const UserDB = require('../data/User')

const handleNewUser = async (req, res) => {
  const { userName, password, roles } = req.body
  if (!userName || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' })
  // check for duplicate usernames in the db
  const duplicate = await UserDB.findOne({ userName: userName }).exec()
  if (duplicate) return res.sendStatus(409) //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10)
    //store the new user
    const newUser = await UserDB.create({
      userName: userName,
      password: hashedPwd,
      roles: roles,
    })
    console.log(newUser)
    res.status(201).json({ success: `New user ${userName} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }

// const handleNewUser = async (req, res) => {
//   // console.log(req)
//   const { user, pwd, name } = req.body
//   if (!user || !pwd) {
//     return res.status(400).json({ message: 'UserName or Password not found' })
//   }

//   const duplicate = await db
//     .findOne({ email: req.params.user })
//     .then((valid) => {
//       if (valid) {
//         console.log(valid)
//       } else {
//         console.log('inValid')
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//     })

//   // const duplicate = userDB.users?.find((person) => person.userName === user)
//   if (duplicate)
//     return res.status(400).json({ message: 'UserName already exists' })
//   try {
//     const hashPwd = await bcrypt.hash(pwd, 10)

//     const users = new db({
//       userId: Math.floor(Math.random() * 1000000000),
//       name: name,
//       email: user,
//       password: hashPwd,
//     })

//     const userRes = users.save()
//     res.json(userRes)

//     // const newUser = { userName: user, password: hashPwd }
//     // userDB.setUsers([...userDB.users, newUser])
//     // await fspromises.writeFile(
//     //   path.join(__dirname, '..', 'data', 'users.json'),
//     //   JSON.stringify(userDB.users),
//     // )

//     // console.log(userDB.users)
//     // console.log(newUser)
//     res.sendStatus(200)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }

module.exports = { handleNewUser }
