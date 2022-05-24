const jwt = require("jsonwebtoken");
const {registerService, loginService} = require("../services/authServices")

const registerController = async (req, res, next) => {
      try {
        let { username, email, password } = req.body;
        if (!username || !email || !password) {
          return res.status(400).json({ msg: "Provide perfect data." });
        }
        const user = await registerService({username, email, password});
        res
          .status(200)
          .json({ msg: "User Registered Successfully.", info: user });
    } catch (err) {
      next(err);
    }
}

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({
            msg: "Invalid email or password",
          });
        }
        const user = await loginService({email, password});
        const token = await jwt.sign(user, "SECRET_KEY");
        return res.status(200).json({ msg: "Successfully Loggedin", token: token });
      } catch (err) {
        next(err);
      }
}


module.exports = {
    registerController,
    loginController
}