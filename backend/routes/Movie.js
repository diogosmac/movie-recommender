const express = require("express")
const router = express.Router()
const axios = require("axios")
const { like, unlike } = require("../controllers/UserLikes")

// get details of movie by id
router.get("/details/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// get streaming services of movie by id
router.get("/details/streaming/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/watch/providers?api_key=8ef1582bce336c778e54d74f414322a7`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// add like to movie (user and movie IDs in request body)
router.post("/like", like)
// remove like from movie (user and movie IDs in request body)
router.post("/unlike", unlike)

module.exports = router
