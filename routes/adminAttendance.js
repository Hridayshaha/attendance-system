// Module Import
const routes = require('express').Router()
const {getEnable, getStatus, getDisable} = require('../controller/adminAttendance')
const authenticate = require('../middlewares/authenticate')


// Routes
routes.get("/enable", authenticate, getEnable);
routes.get("/status", authenticate, getStatus);
routes.get("/disable", authenticate, getDisable);


// Module Export
module.exports = routes;