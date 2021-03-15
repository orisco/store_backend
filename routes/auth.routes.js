const router = require("express").Router()
const { User } = require("../db/models/user.model")
const { verifyRefreshToken} = require("../config/verify")

// REGISTER pt.1
router.post("/validate-register", (req, res) => {
  // check if user exists
  User.findOne({$or: [
    {_id: req.body._id},
    {email: req.body.email}
  ]
  }).then((user)=> {
    if (!user) return res.json({err: false, msg:"no user exist"})
    if (user.email === req.body.email) {
      res.json({err: true, msg: "email exist"});
    } else if (user._id === req.body._id) {
      res.json({err: true, msg: "user id"});
    } else {
      res.json({err: true, msg: "both user id and email exist"});
    }
  }).catch((error) => {
    res.json({err: false, error})
  })
})

// REGISTER pt.2
router.post("/register", (req, res) => {
  const body = req.body;
  const newUser = new User(body)

  newUser.save().then(() => {
    return newUser.createSession();
  }).then((refreshToken) => {
     return newUser.generateAccessToken().then((accessToken) => {
      return {accessToken, refreshToken}
    })}).then((authTokens) => {
    res
    .json({newUser, refreshToken: authTokens.refreshToken, accessToken: authTokens.accessToken })
  }).catch((e) => {
    res.status(400).send(e);
    })
  })


router.post("/login", (req, res) => {
        const {email, password} = req.body;
        User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
        return user.generateAccessToken().then((accessToken) => {
        return {accessToken, refreshToken}
      })   
    }).then((authTokens) => {  
      res.json({user, refreshToken: authTokens.refreshToken, accessToken: authTokens.accessToken })
    })
    }).catch((error) => {
      return res.status(404).send("no such user")
    })
});

// access-token - generating and returning an new access token
router.get("/refresh", verifyRefreshToken, (req, res) => {
  try {
      req.userObject.generateAccessToken().then((accessToken) => {
      res.json({'access-token': accessToken})})
  } catch (error) {
    return res.json({err: true, error})
  }
})

module.exports = router;