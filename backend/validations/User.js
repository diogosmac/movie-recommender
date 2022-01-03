const Joi = require("joi");

const createValidation = Joi.object({
    name: Joi.string().required(),
    password :Joi.string().required().min(6),
    email : Joi.string().email().required()
     
});

const loginValidation = Joi.object({
    password :Joi.string().required().min(6),
    email : Joi.string().email().required()
     
});


module.exports = {
    createValidation,
    loginValidation
};
