// Module Import
const routes = require('express').Router()
const userController = require("../controller/users")

// Routes Handle

/**
 * Delete A Single User
 */
 routes.delete("/:userId", userController.deleteUserById)

/**
 * Put or Replace A Single User
 */
 routes.put("/:userId", userController.putUserById)

/**
 * Patch or Update A Single User
 */
 routes.patch("/:userId", userController.patchUserById)

/**
 * Get A Single User
 */
 routes.get("/:userId", userController.getUserById)

/**
 * Create User
 */
 routes.post("/", userController.createUser)

/**
 * Get All Users
 * 
 */
routes.get("/", userController.getAllUsers)

// Module Export
module.exports = routes;