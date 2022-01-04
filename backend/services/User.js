const user = require("../models/user");
const User = require("../models/user");

const insert = (userData) => {
    const user = new User(userData);
    return user.save();
}
const list = () => 
{
   return user.find({});
}

const loginUser= (loginData) => 
{
    return user.findOne(loginData);
}


module.exports = {
    insert,
    list,
    loginUser
}