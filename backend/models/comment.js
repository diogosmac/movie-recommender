const { number, string } = require("joi");
const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    user : {
        type :mongoose.Types.ObjectId,
        ref :"user",
    },
    text : {
        type: String
    },
    imdb_id: {
        type: String,
        required:true,
    }

   
},
    { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);