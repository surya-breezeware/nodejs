const path = require('path')
const userDB = {
  users: require("../data/users.json"),
  setUsers: function(data) {
    this.users = data;
  },
};

const employeeDetails = (req, res) => {
  res.json(userDB.users)
}

module.exports = { employeeDetails }
