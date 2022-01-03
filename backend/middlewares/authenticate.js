const { response } = require("express");
const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req,res,next) =>
{
    //const authHeader = req.headers["authorization"];
   // const token = authHeader && authHeader.split(" ")[1];
    const token = req.headers?.authorization?.split(" ")[1] || null
    if(token === null)
    {
        return res.status(httpStatus.UNAUTHORIZED).send({error : "Please sign in !"});
    };
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user) => {
        if(err) return res.status(httpStatus.FORBIDDEN).send({error : "Token experied, Please sign in !"});
        
        req.user=user;
        next();
    })
};

module.exports = authenticateToken;