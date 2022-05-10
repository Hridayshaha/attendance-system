// Module Import
const mongoose = require("mongoose");

// Function
const dbConnection = (connectionStr) => {
  return mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Module Export
module.exports = dbConnection;
