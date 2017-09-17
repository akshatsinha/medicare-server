const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Model definition
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  fname: String,
  lname: String,
  phone: String
})

// On Save Hook, encrpyt password
userSchema.pre('save', function (next) {
  const user = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return cb(err) }
    cb(null, isMatch)
  })
}

// Model Class
const ModelClass = mongoose.model('user', userSchema)

module.exports = ModelClass
