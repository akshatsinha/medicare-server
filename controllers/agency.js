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
    res.send('Agency added successfully!')
  })
}

// function editAgency (req, res, next) {
//   const { id } = req.body

// }


module.exports = {
  getAgencyList,
  addAgency
}
