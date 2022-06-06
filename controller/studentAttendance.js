// Module Import
const adminAttendance = require('../model/AdminAttendance')
const studentAttendance = require('../model/StudentAttendance')
const {isRunning} = require('../services/adminAttendanceServices')
const {addMinutes, isAfter} = require("date-fns")

const error = require('../utils/error')

// Student Attendance Controllers
const getAttendanceStatus = async (req, res, next) => {
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
const getAttendanceById = async (req, res, next) => {
    const {id} = req.params
    console.log(id)
    try{
        const attendance = adminAttendance.findOne({_id: id});
        if(!attendance){
            throw error.createError("Invalid Attendance Id", 400);
        }

        if(adminAttendance.status === "COMPLETED"){
            throw error.createError("Attendance timelimit exists", 400)
        }

        let newAttendance = await studentAttendance.findOne({userid: req.user._id, adminAttendanceid: id})
        if(newAttendance){
            throw error.createError("Already Done Attendance", 400)

        }
         newAttendance = new studentAttendance({
            userid: req.user._id,
            adminAttendanceid: id
        }) 

        await newAttendance.save()

        res.status(201).json(newAttendance)
        
   }catch (err) {
       next(err)
   }
}


// Module Export
module.exports = {
    getAttendanceById, 
    getAttendanceStatus
}