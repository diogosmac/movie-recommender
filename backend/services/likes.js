const Likes = require("../models/likes")

const insert = (LikeData) => {
    const like = new Likes(LikeData);
    return like.save();
}
const FindByImdbId = (LikesImdbData) => 
{
   return Comment.findOne({imdb_id : LikesImdbData});
}

const deleteCommentByID = (LikeId) =>{
    Product.findByIdAndDelete(LikeId, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`Comment ${LikeId} deleted.`)
        }
    })
}


module.exports = {
    insert,
    FindByImdbId,
    deleteCommentByID
}