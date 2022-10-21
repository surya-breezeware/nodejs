
const express = require("express");
const path = require("path");
const { authController } = require("../../controllers/authController");
const { employeeDetails } = require("../../controllers/employeeDetails");
const { handleNewUser } = require("../../controllers/registerController");
const router = express.Router();

router.use("/display", employeeDetails);

router.use("/new", handleNewUser);

router.post('/', authController)

router.route('/employeess')
.get(employeeDetails)
module.exports = router;
