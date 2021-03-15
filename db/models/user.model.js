const mongoose = require("mongoose")
const lodash = require("lodash")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  _id: {
      type: String,
      minlength: 8,
      trim: true
  },
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  sessions: {
    token: {
      type: String,
    },
    expiresAt: {
      type: Number,
    }
  }
})


// Instances Methods
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  // return doc without password and sessions
  return lodash.omit(userObject, ['password', 'sessions'])
}

UserSchema.methods.generateAccessToken = async function() {
  const user = this;
   return await jwt.sign({_id: user._id, role: user.role}, "secretblah", {expiresIn: "20m"}) 
}

UserSchema.methods.generateRefreshToken = function() { 
  return new Promise ((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
    if (!err) {
      let token = buf.toString('hex')
      return resolve(token)
    }   
  })
  })
 }
      

// MODELS - STATIC METHODS //
UserSchema.statics.findByIdandToken = function(_id, token) {
  const User = this;
  return User.findOne({
    _id, 
    'sessions.token': token
  })
}

// create LOGIN (FIND BY EMAIL AND ID)
UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) return Promise.reject();
    return new Promise((resolve, reject)=> {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) resolve(user)
        else {
          reject(err);
        }
      })
    })
  })
}

// check is refresh token is expired
UserSchema.statics.hasRefreshTokenExpired =  (expiresAt) => {
  const secondsSinceEpoch = Date.now() / 1000;
  if (expiresAt > secondsSinceEpoch) {
    return false;
  } else {
    return true;
  }
}

// MIDDLEWARE //
// hash password
UserSchema.pre('save', function(next) {
  const user = this;
  const costFactor = 10; // number of hashing rounds
  if (user.isModified('password')) { // if the password field has been changed, then run this code
    // generate salt and hash password
    bcrypt.genSalt((costFactor, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    }))
  } else {
    next()
  }
})



// HELPER METHODS // 
const saveSessionToDB = async (user, refreshToken) => {
    try {
    const expires = await RefreshTokenExpires()
    user.sessions.token = refreshToken;
    user.sessions.expiresAt = expires;
    await user.save()
      // save session successfully
      return refreshToken
    } catch (e) {
      return (e);
    }
}

UserSchema.methods.createSession = function() {
  let user = this;
  return user.generateRefreshToken().then((refreshToken) => {
    return saveSessionToDB(user, refreshToken);
  }).then((refreshToken) => {
    return refreshToken
  }).catch((e) => {
    return Promise.reject('Failed to save session to db' + e)
  })
}

const RefreshTokenExpires = () => {
  const daysUntilExpires = "10";
  const secondsUntilExpires = ((daysUntilExpires * 24) * 60) * 60;
  return ((Date.now() / 1000) + secondsUntilExpires)
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }