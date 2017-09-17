const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const config = require('../config')
const User = require('../models/user')

// Setup local strategy (used for loging in when the user goes to sign-in page)
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  // Verify the email and password and call done if correct
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    // compare passwords -> comparePassword is a method added on User schema
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }
      return done(null, user) // Passport attaches this to req. Can be accessed as req.user
    })
  })
})

// for requireAuth
// Setup JWT Strategy (used for accessing authenticated routes when user sends the token)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}
const verifyJwtToken = new JwtStrategy(jwtOptions, (payload, done) => {
  // If the user ID in the payload exists in the DB
  // If it does, call done with the user object
  // Else, call done without a user object
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false) }
    if (user) { done(null, user) }
    else { done(null, false) }
  })
})

// Hook it up with passport
passport.use(verifyJwtToken)
passport.use(localLogin)
