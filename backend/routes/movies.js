const express = require("express");
const router = express.Router();
const axios = require("axios");
const { create, FindByImdbIds, update } = require("../controllers/Comment")
const { createLikes, FindByImdbIdsLikes } = require("../controllers/Likes")
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.get("/:pageNumber", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US&page=${req.params.pageNumber}`)
        .then(response => {
            console.log(response.data.results)
            res.send(response.data.results)
        })
        .catch(err => next(err));
});

// search for a movie by name
router.get("/search/:name", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8ef1582bce336c778e54d74f414322a7&query=${req.params.name}&language=en-US`).then(response => {
        console.log(response.data);
        res.send(response.data);
    })
        .catch(err => next(err));
})

// http://localhost:4000/movie/${this.state.pageNumber}
// http://localhost:4000/movie/details/${id}
// http://localhost:4000/movie/search/${}

router.get("/details/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
        console.log(response.data);
        res.send(response.data);
    })
        .catch(err => next(err));
})

router.route("/details/c/:id").get(FindByImdbIds);

router.route("/details/:id").post(create);

router.route("/details/like/:id").get(FindByImdbIdsLikes);
router.route("/details/likes/:id").post(createLikes);



router
    .route("/c/:id")
    .patch(authenticate, update);

module.exports = router;
