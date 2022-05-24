// Module Import
const express = require("express");
const dbConnection = require("./db");
const routes = require("./routes")

// Initialize Application
const app = express();

// Buildin Middlewares
app.use(express.json());

// Custom Middlewares

// Routes
app.use(routes)


// Error Handing
app.use((err, req, res, next) => {
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : "Server Error Occured"
  console.log("Error Is: " + err.message);
  return res.status(status).json({ msg: message });
});

// Server Configuration
const dbStr =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/attendance-system";

dbConnection(dbStr)
  .then(() => {
    console.log("Database Connected!");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
