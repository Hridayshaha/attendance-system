const jwt = require("jsonwebtoken");
const User = require("../model/User")
const error = require("../utils/error")

const authenticate = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            throw error.createError("Unauthorized", 401);
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, "SECRET_KEY");
        if(!decoded){
            throw error.createError("Unauthorized", 401);
        }
    
      const validUser = await User.findById({_id: decoded._id})
      if(!validUser){
        throw error.createError("Unauthorized", 401);
    
      }
      const reqUser = {
          _id: validUser._id,
          username: validUser.username,
          email: validUser.email,
          roles: validUser.roles,
          accountStatus: validUser.accountStatus,
      }

      req.user = reqUser;

      next()
    }catch(err){
        next(err)
    }
}

module.exports = authenticate;