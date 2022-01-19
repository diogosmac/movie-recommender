const user = require("../models/user")
const User = require("../models/user")

const insert = (userData) => {
    const user = new User(userData)
    return user.save()
}

const list = () => {
    return user.find({})
}

const loginUser = (loginData) => {
    return user.findOne(loginData)
}

const getUserByEmail = (email) => {
    return user.findOne(email)
}

const checkLiked = (userId, movieId) => {
    console.log('userId', userId)
    const user = user.findOne(userId)
    console.log('user', user)
    return user.find({ liked_movies: { "$in": movieId } })
    // return user.liked_movies.includes(movieId)
}

const likeMovie = (userId, movieId) => {
    const user = user.findOne(userId)
    user.liked_movies.push(movieId)
    return user.save()
}

const unlikeMovie = (userId, movieId) => {
    const user = user.findOne(userId)
    user.liked_movies = array.filter((v, i, a) => { return v !== movieId })
    return user.save()
}

module.exports = {
    insert,
    list,
    loginUser,
    getUserByEmail,
    checkLiked,
    likeMovie,
    unlikeMovie,
}