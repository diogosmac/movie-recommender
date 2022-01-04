const { number, string } = require("joi");
const mongoose = require("mongoose");


const LikesSchema = new mongoose.Schema({
    user : {
        type :mongoose.Types.ObjectId,
        ref :"user",
    },
    imdb_id: {
        type: String,
        required:true,
    }

   
},
    { timestamps: true }
);

module.exports = mongoose.model("likes", LikesSchema);