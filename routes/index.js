// Module Import
const routes = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users')
const adminAttendanceRoutes = require('./adminAttendance')
const studentAttendanceRoutes = require('./studentAttendance')
// All routes
routes.use("/api/v1/auth", authRoutes);
routes.use("/api/v1/users", userRoutes);
routes.use("/api/v1/admin/attendance", adminAttendanceRoutes)
routes.use("/api/v1/student/attendance", studentAttendanceRoutes);
routes.get("/health", (req, res) => {
    res.status(200).json({message: "Connection Ok"})
  });
// Module Export
module.exports = routes;