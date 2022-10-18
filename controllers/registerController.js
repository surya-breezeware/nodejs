const userDB = {
  users: require("../data/users.json"),
  setUsers: function(data) {
    this.users = data;
  },
};

const fspromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  //   console.log(req);
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "UserName or Password not found" });
  }
  const duplicate = userDB.users?.find((person) => person.userName === user);
  if(duplicate) return res.status(400).json({"message":"UserName already exists"})
  try {
    const hashPwd = await bcrypt.hash(pwd, 10);

    const newUser = { userName: user, password: hashPwd };
    userDB.setUsers([...userDB.users, newUser]);
    await fspromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(userDB.users)
    );

    console.log(userDB.users);
    console.log(newUser);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
