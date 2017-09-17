const mongoose = require('mongoose')
const Schema = mongoose.Schema

const officeSchema = new Schema({
  name: String,
  address: String,
  phone: String
})

const ModelClass = mongoose.model('office', officeSchema)

module.exports = ModelClass
