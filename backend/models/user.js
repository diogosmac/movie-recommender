const { number } = require("joi");
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    country: String,
    genres: [Object],
    age: String,
    liked_genres: [String],
    liked_movies: [Number],
    img: {
      type: String,
      default: "",
    },
    accessLevel: {
      type: Number,
      default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);