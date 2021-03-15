const {User} = require("../db/models/user.model")
const jwt = require("jsonwebtoken")

const verifyRefreshToken = (req, res, next) => {
  try {
    
    let refreshToken = req.header('refreshtoken')
    let _id = req.header('_id');
    User.findByIdandToken(_id, refreshToken).then((user) => {
      if (!user) return res.status(401).json({err: true, msg: "User not found"})
      req.userObject = user
   
      if (user.sessions.token === refreshToken) {
        if (User.hasRefreshTokenExpired(user.sessions.expiresAt) === false) {
          next()
        }
      } else {
      return res.status(401).json({err: true, msg: "refresh token has expired, or session is invalid"})
      }
    })
  } catch (error) {
    return res.json({err: true, error})
  }
}

const verifyAccessToken = (req, res, next) => { 
    const token = req.header('Authorization')
    jwt.verify(token, "secretblah", (err, decoded) => {
    if (err) return res.status(401).json({err: true, msg: "AT is expired"})
    req.user_id = decoded._id;
    req.user_role = decoded.role;
    next()
    })
}




module.exports = {verifyRefreshToken, verifyAccessToken};