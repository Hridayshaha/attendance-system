// Module Import
const User = require('../model/User')

// Services Work
const findUser = async (key, value) => {
    if(key === '_id'){
        return await User.findById({ [key]: value});
    }

    return await User.findOne({ [key]: value});
}

const createNewUser = async ({ username, email, password }) => {
    const user = new User({ username, email, password });
    return await user.save();
}

// Module Export
module.exports = {
    findUser,
    createNewUser
}