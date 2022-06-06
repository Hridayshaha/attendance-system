// Module Import
const { Schema, model } = require("mongoose");

// Schema Creation
const studentAttendanceSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  adminAttendanceid: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
    required: true
  },
}, {timestamps: true});

// Creation Model
const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

// Export Model
module.exports = StudentAttendance;
