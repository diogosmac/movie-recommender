const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");
const { generateAccesToken } = require("../scripts/utils/helper");

router.get("/", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US&page=${req.body.pageNumber}`)
        .then(response => {
            console.log(response.data.results)
            res.send(response.data.results)
        })
        .catch(err => next(err));
});

router.get("/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
        console.log(response.data);
        res.send(response.data);
    })
        .catch(err => next(err));
})

module.exports = router;
