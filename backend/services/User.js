const user = require("../models/user");
const User = require("../models/user");

const insert = (userData) => {
    const user = new User(userData);
    console.log("gayyyy")
    console.log(user)
    return user.save(function (err, doc) {
    if (err) return console.error(err);
    console.log(doc);
    // Doc will contain record saved in db.
    });
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