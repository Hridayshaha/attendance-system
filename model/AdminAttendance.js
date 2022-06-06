// Module Import
const { Schema, model } = require("mongoose");

// Schema Creation
const adminAttendanceSchema = new Schema({
  timelimit: {
    type: Number,
    required: true,
    max: 30,
    min: 5,
    default: 5
  },
  status: {
    type: String,
    required: true,
    enum: ["RUNNING", "COMPLETED"], 
    default: "RUNNING"
  },
  
}, {timestamps : true});

// Creation Model
const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);

// Export Model
module.exports = AdminAttendance;
