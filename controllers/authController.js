const userDB = {
    users: require("../data/users.json"),
    setUsers: function(data) {
      this.users = data;
    },
  };
  
  const fspromises = require("fs").promises;
  const path = require("path");
  const bcrypt = require("bcrypt");

  const jwt=require('jsonwebtoken')
  require('dotenv').config()

  const authController=async (req,res)=>{
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "UserName or Password not found" });
    }
    const foundUser = userDB.users?.find(person=>
        person.userName===userName
    )

if(!foundUser) return res.sendStatus(401)

const match=await bcrypt.compare(password,foundUser.password)
if(match){
    const accessToken=jwt.sign({
        "userName":foundUser.userName},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'30s'
        }
    )
    const refreshToken=jwt.sign({
        "userName":foundUser.userName},
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:'1d'
        }
    );

    const otherUsers=userDB.users.filter(person=>person.userName!=foundUser.userName)
    const currentUser={...foundUser,refreshToken};
    userDB.setUsers([...otherUsers,currentUser])
    await fspromises.writeFile(
        path.join(__dirname,'..','data','users.json'),
        JSON.stringify(userDB.users)
    )
    res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*1000})
    res.json({accessToken})
}else{
    res.status(400).json({'message':'Incorrect password'})
}
  }

  module.exports={authController}