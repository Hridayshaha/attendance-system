// Module Import
const express = require("express");
const dbConnection = require("./db");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Initialize Application
const app = express();

// Buildin Middlewares
app.use(express.json());

// Custom Middlewares

// Routes

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const isMatched = await bcrypt.compare(password, user._doc.password);

    if (!isMatched) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const displayUser = {
      username: user.username,
      email: user.email,
      roles: user.roles,
      accountStatus: user.accountStatus,
    };

    const token = await jwt.sign(displayUser, "SECRET_KEY");

    return res.status(200).json({ msg: "Successfully Loggedin", token: token });
  } catch (err) {
    next(err);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Provide perfect data." });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    password = hash;
    user = new User({ username, email, password });
    await user.save();
    const displayUser = {
      username: user.username,
      email: user.email,
      roles: user.roles,
      accountStatus: user.accountStatus,
    };
    res
      .status(200)
      .json({ msg: "User Registered Successfully.", info: displayUser });
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello Browser!",
  });
});

// Error Handing
app.use((err, req, res, next) => {
  console.log("Error Is: " + err.message);
  return res.status(500).json({ msg: "Server Error Occured" });
});
// Server Configuration

const dbStr =
  process.env.DB_URL || "mongodb://localhost:27017/attendance-system";

dbConnection(dbStr)
  .then(() => {
    console.log("Database Connected!");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
