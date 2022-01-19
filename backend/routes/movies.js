const express = require("express")
const router = express.Router()
const axios = require("axios")
const { like, unlike } = require("../controllers/User")
const { create, FindByImdbIds, update } = require("../controllers/Comment")
// const validate = require("../middlewares/validate")
// const authenticate = require("../middlewares/authenticate")

// get generic recommendations (specific page number)
router.get("/:pageNumber", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US&page=${req.params.pageNumber}`)
        .then(response => {
            res.send(response.data.results)
        })
        .catch(err => next(err))
})

// search for a movie by name
router.get("/search/:name", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8ef1582bce336c778e54d74f414322a7&query=${req.params.name}&language=en-US`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// get details of movie by id
router.get("/details/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// get recommendations based on liked movie
router.get("/recommendations/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/recommendations?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
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

router.get("/user/:id", (req, res, next) => {
    let movies = {}
    axios.get(`http://localhost:4000/users/get/${req.params.id}`).then(async (response) => {
        if (response.status == 200) {
            // number of recommendations to be presented to the user
            const NUMBER_OF_RECOMMENDATIONS = 20
            const user = response.data
            if (user.liked_movies.length > 0) {
                // arbitrary value, higher means genres have more weight
                // could be a property defined by the user :eyes:
                const GENRE_MULTIPLIER = 2
                for (let movie of user.liked_movies) {
                    await axios.get(`http://localhost:4000/movie/recommendations/${movie}`).then((response) => {
                        for (let recommendation of response.data.results) {
                            if (!(recommendation.id in movies)) {
                                // calculate overlap in genres, multiply by GENRE_MULTIPLIER, will be added to initial score
                                let genreOverlap = recommendation.genre_ids.filter(
                                    rg => user.genres
                                        .map((ug => ug.id))
                                        .includes(rg)
                                )
                                movies[recommendation.id] = {
                                    title: recommendation.title,
                                    release_date: recommendation.release_date,
                                    poster_path: recommendation.poster_path,
                                    overview: recommendation.overview,
                                    id: recommendation.id,
                                    score: 1 + genreOverlap.length * GENRE_MULTIPLIER
                                }
                            } else {
                                movies[recommendation.id].score += 1
                            }
                        }
                    }).catch(err => next(err))
                }
            } else {
                // each page of the API presents 20 recommendations
                // we can calculate the least amount of pages in the popularity ranking that we
                // need to search in order to meet the number of recommendations that we want
                for (let i = 1; i <= Math.ceil(NUMBER_OF_RECOMMENDATIONS / 20); i++) {
                    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US&page=${i}`)
                        .then((response) => {
                            for (let recommendation of response.data.results) {
                                let genreOverlap = recommendation.genre_ids.filter(
                                    rg => user.genres
                                        .map((ug => ug.id))
                                        .includes(rg)
                                )
                                movies[recommendation.id] = {
                                    title: recommendation.title,
                                    release_date: recommendation.release_date,
                                    poster_path: recommendation.poster_path,
                                    overview: recommendation.overview,
                                    id: recommendation.id,
                                    score: genreOverlap.length
                                }
                            }
                        }).catch(err => next(err))
                }
            }
            movies = Object.values(movies)
            movies = movies.sort(({ score: a }, { score: b }) => (b - a));
            res.send(movies.slice(0, NUMBER_OF_RECOMMENDATIONS))
        } else {
            res.send(movies)
        }
    }).catch(err => next(err))
})

// // router.route("/details/comment/:id").get(FindByImdbIds)
// // router.route("/details/:id").post(create)
// // router
// //     .route("/comment/:id")
// //     .patch(authenticate, update)

module.exports = router
