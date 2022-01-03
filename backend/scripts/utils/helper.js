const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken")

const passwordToHash = (password) =>
{
     return CryptoJS.HmacSHA256(password,CryptoJS.HmacSHA1(password,process.env.PASSWORD_HASH).toString()).toString();
}

const generateAccesToken = (user) => {
    return JWT.sign({name : user.name , ...user},process.env.ACCESS_TOKEN_SECRET_KEY,{ expiresIn:"1d"});
}

const generateRefreshToken = (user) => {
    return JWT.sign({name : user.name, ...user},process.env.REFRESH_TOKEN_SECRET_KEY);
}
module.exports = {
    passwordToHash,
    generateAccesToken,
    generateRefreshToken,
}