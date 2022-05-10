// Module Import
const { Schema, model } = require("mongoose");

// Schema Creation
const profileSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Creation Model
const Profile = model("Profile", profileSchema);

// Export Model
module.exports = Profile;

//
//
// Module Import
// Schema Creation
// Creation Model
// Export Model
