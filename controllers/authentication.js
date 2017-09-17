const jwt = require('jwt-simple')
const config = require('../config')
const passport = require('passport')
const User = require('../models/user')
const errorHandler = require('../utils/error_handler')
const successHandler = require('../utils/success_handler')

function tokenForUser (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function (req, res, next) {
  // User has already had their email/password auth'd
  // Only return a token here.
  // We have access to user through req.user (thanks to passport's done cb)
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
  const { email, password, fname, lname, phone } = req.body
  if (!email || !password) {
    return res.status(422).send(errorHandler(422, 'Email or Password missing'))
  }
  // User with given email exist?
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      return res.status(422).send(errorHandler(422, 'Email already in use'))
    }
    // If NOT exist, create and save user record
    const user = new User({ email, password, fname, lname, phone })
    user.save((err) => {
      if (err) { return next(err) }
      // res.json(successHandler(200, 'Successfully Created User'))
      res.json({ token: tokenForUser(user) })
    })
  })
}
