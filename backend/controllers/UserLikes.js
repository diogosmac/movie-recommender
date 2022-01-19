const { likeMovie, unlikeMovie } = require("../services/UserLikes")
const httpStatus = require("http-status")

const like = (req, res) => {
  likeMovie(req.body.user_id, req.body.movie_id).then((user) => {
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "You are not logged in. Please log in before you like this movie." })
    }
    res.status(httpStatus.OK).send(user)
  })
}

const unlike = (req, res) => {
  unlikeMovie(req.body.user_id, req.body.movie_id).then((user) => {
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "There is a database problem. Your user was not found." })
    }
    res.status(httpStatus.OK).send(user)
  })
}

module.exports = {
  like,
  unlike
}
