const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/",(req,res,next) => {

    var options = {
        method: 'GET',
        url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
        params: {type: 'get-trending-movies', page: '1'},
        headers: {
          'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
          'x-rapidapi-key': '669f1f8229msh7ba6b2a7e12bc36p17090ajsnd97b67b5d895'
        }
      };
      axios.request(options).then(function (response) {
        console.log(response)
      }).catch(function (error) {
          console.error(error);
      });
});

module.exports = router;
