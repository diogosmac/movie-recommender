//validations
//validate middleware
const express = require("express");
const router = express.Router();
const schemas = require("../validations/User"); //validations
const validate = require("../middlewares/validate");//validations middleware
const {create,index, login} = require("../controllers/User");
const authenticateToken = require("../middlewares/authenticate");

router.route("/").get(index);
router.route("/").post(validate(schemas.createValidation),create);
router.route("/login").post(validate(schemas.loginValidation),login);
router.post(`/logout`, (req,res) => {       
    res.json({})
})
module.exports= 
    router