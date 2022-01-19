//validations
//validate middleware
const express = require("express");
const router = express.Router();
const schemas = require("../validations/User"); //validations
const validate = require("../middlewares/validate");//validations middleware
const { create, index, login, getUser } = require("../controllers/User");

router.route("/").get(index);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/get/:_id").get(getUser)
router.route("/login").post(validate(schemas.loginValidation), login);
router.post("/logout", (req, res) => {
    res.json({})
})
module.exports = router