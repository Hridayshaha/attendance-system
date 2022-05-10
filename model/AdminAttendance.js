// Module Import
const { Schema, model } = require("mongoose");

// Schema Creation
const adminAttendanceSchema = new Schema({
  createdAt: new Date(),
  status: {
    type: String,
  },
  timelimit: {
    type: String,
  },
});

// Creation Model
const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);

// Export Model
module.exports = AdminAttendance;
