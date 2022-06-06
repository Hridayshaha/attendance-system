// Module Import
const routes = require('express').Router();
const authController = require("../controller/auth")
const authenticate = require("../middlewares/authenticate")

// Routes
routes.post("/login", authController.loginController);
routes.post("/register", authController.registerController);

routes.get("/private", authenticate,async (req, res, next) => {
try{
    console.log("calling from auth", req.user)
    res.status(200).json({message:"private routes"})
}catch(e){
    next(e);
}
});

routes.get("/public", (req, res, next) => {
    res.status(200).json({message:"public routes"})
});
// Module Export
module.exports = routes;