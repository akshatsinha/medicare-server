const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agencySchema = new Schema({
  name: String,
  address: String,
  phone: String
})

const ModelClass = mongoose.model('agency', agencySchema)

module.exports = ModelClass
