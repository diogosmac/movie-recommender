const user = require("../models/user")
const User = require("../models/user")

const insert = (userData) => {
    const newUser = new User(userData)
    return newUser.save()
}

const list = () => {
    return user.find({})
}

const loginUser = (loginData) => {
    return user.findOne(loginData)
}

const getUserByID = (id) => {
    return user.findOne(id)
}

module.exports = {
    insert,
    list,
    loginUser,
    getUserByID,
}