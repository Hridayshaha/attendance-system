// Module Import
const User = require('../model/User')
const userService = require('../services/userServices')
const authServices = require('../services/authServices')
const error = require('../utils/error')

// Function Work

const getAllUsers = async (req, res, next) => {
    try {
        const user = await userService.getAllUsers();
        res.status(200).json(user);
    }catch(err) {
        next(err)
    }
}
const createUser = async (req, res, next) => {
   try {
    const {username, email, password, roles, accountStatus}  = req.body
    const user = await authServices.registerService({username, email, password, roles, accountStatus})
    res.status(200).json(user)
   }catch(err) {
       next(err)
   }
}
const getUserById = async (req, res, next) => {
    try{
        const {userId} = req.params
        const user = await userService.findUser("_id", userId)
        if(!user){
            throw error.createError("User not found!", 403)
        }
        res.status(200).json(user)
    }catch (err) {
        next(err)
    }
}
const putUserById = async (req, res, next) => {
    try{
        const {userId} = req.params
        const {username, roles, accountStatus} = req.body
        const user = await userService.updateUser(userId, {username, roles, accountStatus})
        res.status(200).json(user)
    }catch (err) {
        next(err)
    }
}

const patchUserById = async (req, res, next) => {
    try{
        const {userId} = req.params
        const {username, roles, accountStatus} = req.body
        const user = await userService.updateUser(userId, {username, roles, accountStatus})
        res.status(200).json(user)
    }catch (err) {
        next(err)
    }
}
const deleteUserById = async (req, res, next) => {
    try{
        const {userId} = req.params;
        const deleteUser = await userService.deleteUser(userId)
        res.status(200).json(deleteUser)
    }catch (err) {
        next(err)
    }
    

}

// Module Export
module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    putUserById,
    patchUserById,
    deleteUserById
}