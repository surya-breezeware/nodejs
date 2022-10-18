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

  const refreshTokenHandler= (req,res)=>{
    const cookies=req.cookies
    if (!cookies?.jwt) {
      return res.sendStatus(401)
    }
    console.log(cookies.jwt);
    const refreshToken=cookies.jwt

    const foundUser = userDB.users?.find(person=>
        person.refreshToken===refreshToken
    )

if(!foundUser) return res.sendStatus(401)

jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,
    (err,decoded)=>{
        if(err||foundUser.userName!==decoded.userName) return res.sendStatus(403)
        const accessToken=jwt.sign({
            "userName":decoded .userName},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'30s'
            }
        )

        res.json({accessToken})
    }
    )


  }

  module.exports={refreshTokenHandler}