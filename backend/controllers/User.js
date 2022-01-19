const { insert, list, loginUser, getUserByID, likeMovie, unlikeMovie, checkLiked } = require("../services/User")
const httpStatus = require("http-status")
const { response } = require("express")
const {
  passwordToHash,
  generateAccesToken,
  generateRefreshToken,
} = require("../scripts/utils/helper")

const create = async (req, res) => {
  try {
    req.body.password = passwordToHash(req.body.password) //crypto
    response = await insert(req.body)
    res.status(httpStatus.CREATED).send(response)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password)
  loginUser(req.body).then((user) => {
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Account Not Found. Please check your account details Or Register." })
    }
    user = {
      ...user.toObject(),
      tokens: {
        access_token: generateAccesToken(user),
        refresh_token: generateRefreshToken(user),
      },
    }
    res.status(httpStatus.OK).send(user)
  })
}

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).send(response)
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
}

const getUser = async (req, res) => {
  getUserByID(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response)
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
}

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
  create,
  index,
  login,
  getUser,
  like,
  unlike,
}
