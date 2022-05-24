// Module Import
const routes = require('express').Router();
const authController = require("../controller/auth")

// Routes
routes.post("/login", authController.loginController);
routes.post("/register", authController.registerController);


// Module Export
module.exports = routes;