const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inwardSchema = new Schema({
  bill_amt: Number,
  bill_dt: String,
  bill_no: String,
  bill_pd_amt: Number,
  bill_pd_dt: String,
  bill_rcd_dt: String,
  dd_agency_id: String,
  dd_office_id: String
})

const ModelClass = mongoose.model('inward', inwardSchema)

module.exports = ModelClass
