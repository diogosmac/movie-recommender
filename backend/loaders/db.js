const dotenv = require("dotenv")
dotenv.config({ path: `./config/.env` });

const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
    console.log("Db connection is succesfull !")
})

const connectDB = async () => {
    await Mongoose.connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}
module.exports = {
    connectDB
}