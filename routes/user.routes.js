const router = require("express").Router()
const { User } = require("../db/models/user.model")
const {verifyAccessToken} = require("../config/verify")


// get user and validate token
router.get("/", verifyAccessToken, (req, res) => {
  User.find({_id: req.user_id}).then((user) => {
    res.send(user)
  })
})



module.exports = router;