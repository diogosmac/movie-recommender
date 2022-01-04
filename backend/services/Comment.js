const Comment = require("../models/comment")

const insert = (CommentData) => {
    const comment = new Comment(CommentData);
    return comment.save();
}
const FindByImdbId = (CommentImdbData) => 
{
   return Comment.findOne({imdb_id : CommentImdbData});
}

const deleteCommentByID = (CommentID) =>{
    Product.findByIdAndDelete(CommentID, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`Comment ${CommentID} deleted.`)
        }
    })
}

const updateComment = (data) => {
    return Comment.findOneAndUpdate(data, {new:true})

}


module.exports = {
    insert,
    FindByImdbId,
    updateComment
}