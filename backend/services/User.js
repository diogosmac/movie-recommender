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

const likeMovie = async (userID, movieID) => {
    const currentUser = await user.findOne({ _id: userID })
    currentUser.liked_movies.push(movieID)
    return currentUser.save()
}

const unlikeMovie = async (userID, movieID) => {
    const currentUser = await user.findOne({ _id: userID })
    currentUser.liked_movies = currentUser.liked_movies.filter((v, i, a) => { return v !== parseInt(movieID) })
    return currentUser.save()
}

module.exports = {
    insert,
    list,
    loginUser,
    getUserByID,
    likeMovie,
    unlikeMovie,
}