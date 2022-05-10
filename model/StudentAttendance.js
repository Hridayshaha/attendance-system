// Module Import
const { Schema, model } = require("mongoose");

// Schema Creation
const studentAttendanceSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: new Date(),
  adminAttendanceid: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
  },
});

// Creation Model
const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

// Export Model
module.exports = StudentAttendance;
