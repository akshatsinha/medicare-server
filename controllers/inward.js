const Inward = require('../models/inward')
const moment = require('moment')
const sortBy = require('lodash').sortBy

function addInward (req, res, next) {
  const { bill_amt, bill_dt, bill_no, bill_pd_amt, bill_pd_dt, bill_rcd_dt, dd_agency_id, dd_office_id } = req.body
  const inward = new Inward({ bill_amt, bill_dt, bill_no, bill_pd_amt, bill_pd_dt, bill_rcd_dt, dd_agency_id, dd_office_id })
  inward.save(err => {
    if (err) { return next(err) }
    res.send({ message: 'Inward Successfully Added' })
  })
}

function viewByAgencies (req, res, next) {
  console.log('==== viewByAgencies')
  Inward.find({}, (err, inwards) => {
    let bill_rcd_period = {}
    let resp = []
    inwards.forEach(inward => {
      let numericPeriod = moment(inward.bill_rcd_dt, 'DD-MM-YYYY').format('MMYYYY')
      if (!bill_rcd_period[numericPeriod]) {
        bill_rcd_period[numericPeriod] = {
          'canonical_period': moment(inward.bill_rcd_dt, 'DD-MM-YYYY').format('MMM YYYY'),
          'total_bill_amt': inward.bill_amt,
          'total_bill_pd_amt': inward.bill_pd_amt,
          'inwards': [ inward ],
          'by_agency': {}
        }
        bill_rcd_period[numericPeriod]['by_agency'][inward.dd_agency_id] = [ inward ]
      } else {
        bill_rcd_period[numericPeriod]['total_bill_amt'] += inward.bill_amt
        bill_rcd_period[numericPeriod]['total_bill_pd_amt'] += inward.bill_pd_amt
        bill_rcd_period[numericPeriod]['inwards'].push(inward)
        if (bill_rcd_period[numericPeriod]['by_agency'][inward.dd_agency_id]) bill_rcd_period[numericPeriod]['by_agency'][inward.dd_agency_id].push(inward)
        else bill_rcd_period[numericPeriod]['by_agency'][inward.dd_agency_id] = [ inward ]
      }
      resp.push(bill_rcd_period)
    })
    res.send(bill_rcd_period)
  })
}

function viewByOffices (req, res, next) {
  Inward.find({}, (err, inwards) => {
    let bill_rcd_period = {}
    let resp = []
    inwards.forEach(inward => {
      let numericPeriod = moment(inward.bill_rcd_dt, 'DD-MM-YYYY').format('MMYYYY')
      if (!bill_rcd_period[numericPeriod]) {
        bill_rcd_period[numericPeriod] = {
          'canonical_period': moment(inward.bill_rcd_dt, 'DD-MM-YYYY').format('MMM YYYY'),
          'total_bill_amt': inward.bill_amt,
          'total_bill_pd_amt': inward.bill_pd_amt,
          'inwards': [ inward ],
          'by_office': {}
        }
        bill_rcd_period[numericPeriod]['by_office'][inward.dd_office_id] = [ inward ]
      } else {
        bill_rcd_period[numericPeriod]['total_bill_amt'] += inward.bill_amt
        bill_rcd_period[numericPeriod]['total_bill_pd_amt'] += inward.bill_pd_amt
        bill_rcd_period[numericPeriod]['inwards'].push(inward)
        if (bill_rcd_period[numericPeriod]['by_office'][inward.dd_office_id]) bill_rcd_period[numericPeriod]['by_office'][inward.dd_office_id].push(inward)
        else bill_rcd_period[numericPeriod]['by_office'][inward.dd_office_id] = [ inward ]
      }
      resp.push(bill_rcd_period)
    })
    res.send(bill_rcd_period)
  })
}

function updateInward (req, res, next) {
  const { bill_amt, bill_dt, bill_no, bill_pd_amt, bill_pd_dt, bill_rcd_dt, dd_agency_id, dd_office_id } = req.body.inwardObj
  const { src } = req.body.src
  Inward.findById(req.params.id, (err, inward) => {
    if (err) { return next(err) }
    inward.bill_amt = bill_amt
    inward.bill_dt = bill_dt
    inward.bill_no = bill_no
    inward.bill_pd_amt = bill_pd_amt
    inward.bill_pd_dt = bill_pd_dt
    inward.bill_rcd_dt = bill_rcd_dt
    inward.dd_agency_id = dd_agency_id
    inward.dd_office_id = dd_office_id
    inward.save((err, updatedInward) => {
      if (err) { return next(err) }
      if (req.body.src === 'agency') return viewByAgencies(req, res, next)
      else if (req.body.src === 'office') return viewByOffices(req, res, next)
    })
  })
}

module.exports = {
  addInward,
  viewByAgencies,
  viewByOffices,
  updateInward
}
