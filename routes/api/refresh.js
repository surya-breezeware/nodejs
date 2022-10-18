const express = require("express");
const { refreshTokenHandler } = require("../../controllers/refreshToken");
const router = express.Router();
// const refreshTokenHandler=require('../../controllers/refreshToken')


router.get('/', refreshTokenHandler)

module.exports=router