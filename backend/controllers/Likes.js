const {insert} = require("../services/likes")
const httpStatus = require("http-status");
const Likes = require("../models/likes");


const createLikes = async(req,res) => {
    try {
        const response = await insert(req.body)
        console.log(req.body)
        console.log(response);
         res.status(httpStatus.CREATED).send(response);
         
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

const FindByImdbIdsLikes = async(req,res) => {
    try {
        const response = await Likes.find({imdb_id: req.params.id});
        console.log(response.length);
        res.status(httpStatus.CREATED).send(response)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}



module.exports = {
    FindByImdbIdsLikes,
    createLikes,
    
}