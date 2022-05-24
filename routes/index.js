// Module Import
const routes = require('express').Router();
const authRoutes = require('./auth')
// All routes
routes.use("/api/v1/auth", authRoutes);
routes.get("/health", (req, res) => {
    res.status(200).json({message: "Connection Ok"})
  });
// Module Export
module.exports = routes;