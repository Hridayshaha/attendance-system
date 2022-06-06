const adminAttendance = require('../model/AdminAttendance')
const error = require('../utils/error')

const isRunning = async (condition, message, status=401) => {
    const running = await adminAttendance.findOne({status: 'RUNNING'})
    if(condition === "YES" ? running : !running) {
        throw error.createError(message, status)
    }

    return running;
}

module.exports = {
    isRunning
}