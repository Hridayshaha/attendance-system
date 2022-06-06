
// Module Import
const routes = require('express').Router()
const {getAttendanceStatus, getAttendanceById} = require("../controller/studentAttendance")
const authenticate = require("../middlewares/authenticate")

// Student Attendance routes
routes.get("/status", authenticate, getAttendanceStatus)
routes.get("/:id", authenticate, getAttendanceById)
//Module Export
module.exports = routes