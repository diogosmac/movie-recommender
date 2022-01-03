const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//const dotenv = require("dotenv").config({ path: "./config/.env" });
const helmet = require("helmet")
const config = require("./config/index")
const {UserRoutes, MovieRoutes} = require("./routes/index");
const loaders = require("./loaders");


config();
loaders();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());


// API endpoints


app.listen(process.env.PORT, function () {
  console.log("Server is running on port: " + process.env.PORT);
  app.use("/users",UserRoutes)
  app.use("/movie",MovieRoutes)
});

