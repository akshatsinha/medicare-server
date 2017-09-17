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
    res.send('Office added successfully!')
  })
}

// function editOffice (req, res, next) {
//   const { id } = req.body

// }


module.exports = {
  getOfficeList,
  addOffice
}
