const user = require("../models/user")

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
    likeMovie,
    unlikeMovie,
}