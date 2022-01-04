const { number } = require("joi");
const mongoose = require("mongoose");


const UserLikesSchema = new mongoose.Schema({
    user_id: String,
    film_id: String,
    film_name: String
},
    { timestamps: true }
);

module.exports = mongoose.model("user_likes", UserLikesSchema);