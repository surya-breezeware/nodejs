const path = require('path')
const employeeDB = require('../data/Employee')

const employeeDetails = async (req, res) => {
  const employee = await employeeDB.find()
  if (!employee) {
    console.log(employee, 'emp')
    return res.status(204).json({ message: 'N0 employees found' })
  }

  // console.log(collection)

  // collection.find({}).toArray((err, result) => {
  //   if (err) {
  //     res.send('err')
  //   } else {
  //     res.send(result)
  //   }
  // })
  res.json(employee)
}

const createNewEmployee = async (req, res) => {
  console.log('sdf')
  if (!req?.body?.firstName || !req?.body?.lastName) {
    res.status.json({ message: 'first or last name missing' })
  }

  const duplicate = await employeeDB
    .findOne({ firstName: req?.body?.firstName })
    .exec()

  if (duplicate) {
    res.status(409).json({ message: 'First Name already exist' })
  } else {
    try {
      const result = await employeeDB.create(req?.body)
      result.save()
      res.sendStatus(201)
    } catch (err) {
      console.log(err)
    }
  }
}

const updateEmployee = async (req, res) => {
  console.log('sdf')
  if (!req?.body?.firstName || !req?.body?.lastName) {
    res.status.json({ message: 'first or last name missing' })
  }
  const duplicate = await employeeDB
    .findOne({ firstName: req?.body?.firstName })
    .exec()

  if (duplicate) {
    res.status(409).json({ message: 'First Name already exist' })
  } else {
    try {
      const employee = await employeeDB.findOne({ userId: req.body.userId })
      employee.firstName = req.body?.firstName

      // const result = await employeeDB.create(req?.body)
      employee.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = { employeeDetails, createNewEmployee, updateEmployee }
