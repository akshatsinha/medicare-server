const Agency = require('../models/agency')

function getAgencyList (req, res, next) {
  Agency.find({}, (err, docs) => {
    if (err) { return next(err) }
    res.send(docs)
  })
}

function addAgency (req, res, next) {
  const { name, address, phone } = req.body
  const agency = new Agency({ name, address, phone })
  agency.save(err => {
    if (err) { return next(err) }
    return getAgencyList(req, res, next)
  })
}

function updateAgency (req, res, next) {
  const { name, address, phone } = req.body
  Agency.findById(req.params.id, (err, agency) => {
    if (err) { return next(err) }
    agency.name = name
    agency.address = address
    agency.phone = phone
    agency.save((err, updatedAgency) => {
      if (err) { return next(err) }
      return getAgencyList(req, res, next)
    })
  })
}

function deleteAgency (req, res, next) {
  console.log('=======> ', req.params.id)
  Agency.remove({ _id: req.params.id }, (err) => {
    if (err) { return next(err) }
    return getAgencyList(req, res, next)
  })
}

module.exports = {
  updateAgency,
  getAgencyList,
  addAgency,
  deleteAgency
}
