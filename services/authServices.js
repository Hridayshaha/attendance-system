const bcrypt = require('bcrypt');
const userService = require("./userServices")
const error = require("../utils/error")

const registerService = async ({username, email, password}) => {
    let user = await userService.findUser("email", email)
    if (user) {
        throw error.createError("User already exists!");
   }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    password = hash;
     user = await userService.createNewUser({username, email, password})
    const displayUser = {
        username: user.username,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    };
    return displayUser;
}

const loginService = async ({email, password}) => {
    const user = await userService.findUser("email", email)
    if (!user) {
        throw error.createError("Unauthorized User!", 401);
    }
    const isMatched = await bcrypt.compare(password, user._doc.password);
    if (!isMatched) {
        throw error.createError("Unauthorized User!", 401);
    }
    
    const displayUser = {
        username: user.username,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    };

    return displayUser;
}

module.exports = {
    registerService,
    loginService,
}