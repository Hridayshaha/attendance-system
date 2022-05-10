// Module Import
const { Schema, model } = require("mongoose");

// Schema Creation
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["ACTIVE", "PENDING", "REJECT"],
    default: "PENDING",
  },
});

// Error Handle
userSchema.path("email").validate((email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}, "Email: `{VALUE}` not valid");

// Creation Model
const User = model("User", userSchema);

// Export Model
module.exports = User;
