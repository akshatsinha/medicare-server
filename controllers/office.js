const Office = require('../models/office')

function getOfficeList (req, res, next) {
  Office.find({}, (err, docs) => {
    if (err) { return next(err) }
    res.send(docs)
  })
}

function addOffice (req, res, next) {
  const { name, address, phone } = req.body
  const office = new Office({ name, address, phone })
  office.save(err => {
    if (err) { return next(err) }
    return getOfficeList(req, res, next)
  })
}

function updateOffice (req, res, next) {
  const { name, address, phone } = req.body
  Office.findById(req.params.id, (err, office) => {
    if (err) { return next(err) }
    office.name = name
    office.address = address
    office.phone = phone
    office.save((err, updatedOffice) => {
      if (err) { return next(err) }
      return getOfficeList(req, res, next)
    })
  })
}

function deleteOffice (req, res, next) {
  Office.remove({ _id: req.params.id }, (err) => {
    if (err) { return next(err) }
    return getOfficeList(req, res, next)
  })
}


module.exports = {
  getOfficeList,
  addOffice,
  deleteOffice,
  updateOffice
}
