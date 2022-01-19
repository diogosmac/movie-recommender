const dotenv = require("dotenv")
const Mongoose = require("mongoose");

dotenv.config({ path: `./config/.env` });
const db = Mongoose.connection;

db.once("open", () => {
    console.log(">> Successfully connected to the Database")
})

const connectDB = async () => {
    await Mongoose.connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = { connectDB }