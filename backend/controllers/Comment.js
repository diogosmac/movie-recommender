const {insert,FindByImdbId,updateComment} = require("../services/Comment")
const httpStatus = require("http-status");
const Comment = require("../models/comment");

const create = async(req,res) => {
    try {
        const response = await insert(req.body)
        console.log(response);
         res.status(httpStatus.CREATED).send(response);
         
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

const FindByImdbIds = async(req,res) => {
    try {
        const response = await Comment.find({imdb_id: req.params.id});
        console.log(response);
        res.status(httpStatus.CREATED).send(response)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

const update = async (req, res) => {
    const updatedComment = await updateComment(req.body, req.body.id);
    res.status(httpStatus.OK).send(updateComment);
  };

module.exports = {
    FindByImdbIds,
    create,
    update
}