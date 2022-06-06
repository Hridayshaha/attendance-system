// Module Import
const adminAttendance = require('../model/AdminAttendance')
const {isRunning} = require('../services/adminAttendanceServices')
const {addMinutes, isAfter} = require("date-fns")
// Admin Attendance Controller
const getEnable = async (req, res, next) => {
    try {
        await isRunning("YES", "Already Attendance Is Running", 401);

        const attendance = new adminAttendance({})
        await attendance.save()

        return res.status(200).json(attendance)
    }catch(err) {
        next(err);
    }
}
const getStatus = async (req, res, next) => {
    try{
        const running = await isRunning("NOT", "No Attendance Running", 401);
        const timelimit = addMinutes(new Date(running.createdAt), running.timelimit);
        if(isAfter(new Date(), timelimit)){
            running.status = 'COMPLETED'
            await running.save()
            return res.status(200).json(running)
        }
        return res.status(200).json(running)
    }catch (err) {
        next(err)
    }
}
const getDisable = async (req, res, next) => {
   try{
    const running = await isRunning("NOT", "No Attendance Running", 401);
    running.status = 'COMPLETED'
    await running.save()

    return res.status(201).send()
   }catch (err) {
       next(err)
   }
}

// Module Export
module.exports = {
    getEnable, getStatus, getDisable
}