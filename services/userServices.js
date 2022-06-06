// Module Import
const { findByIdAndDelete } = require('../model/User');
const User = require('../model/User')
const error = require('../utils/error')

// Services Work
const findUser = async (key, value) => {
    if(key === '_id'){
        return await User.findById({ [key]: value});
    }

    return await User.findOne({ [key]: value});
}

const createNewUser = async ({ username, email, password, roles=["STUDENT"], accountStatus="PENDING" }) => {
    const user = new User({ username, email, password, roles, accountStatus});
    return await user.save();
}

const getAllUsers = async () => {
    return await User.find();
}

const updateUser = async (userId, {username, roles, accountStatus}) => {
    let user = await findUser("_id", userId);
    if(!user){
        throw error.createError("User not found")
    }
    user.username= username ?? user.username
    user.accountStatus = accountStatus ?? user.accountStatus
    user.roles = roles ?? user.roles

    return await user.save()
}


const deleteUser = async (userId) => {
    let user = await User.findByIdAndDelete({_id: userId})
    if(!user){
        throw error("User not found!")
    }

    return user;
}
// Module Export
module.exports = {
    findUser,
    createNewUser,
    getAllUsers,
    updateUser,
    deleteUser
}