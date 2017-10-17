const passport = require('passport')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const agencyCtrl = require('./controllers/agency')
const officeCtrl = require('./controllers/office')
const inwardCtrl = require('./controllers/inward')

const requireAuth = passport.authenticate('jwt', { session: false }) // for authenticated routes

module.exports = function (app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ 'hi': 'authenticated' })
  })

  app.post('/agency/add', requireAuth, agencyCtrl.addAgency)
  app.get('/agency/list', requireAuth, agencyCtrl.getAgencyList)
  app.post('/agency/update/:id', requireAuth, agencyCtrl.updateAgency)
  app.delete('/agency/delete/:id', requireAuth, agencyCtrl.deleteAgency)

  app.post('/office/add', requireAuth, officeCtrl.addOffice)
  app.get('/office/list', requireAuth, officeCtrl.getOfficeList)
  app.post('/office/update/:id', requireAuth, officeCtrl.updateOffice)
  app.delete('/office/delete/:id', requireAuth, officeCtrl.deleteOffice)

  app.post('/inward/add', requireAuth, inwardCtrl.addInward)
  app.post('/inward/update/:id', requireAuth, inwardCtrl.updateInward)
  app.get('/inward/view-by-agencies', requireAuth, inwardCtrl.viewByAgencies)
  app.get('/inward/view-by-offices', requireAuth, inwardCtrl.viewByOffices)

  // requireSignin verifies email/pwd. Authentication.genUserTokenOnSignin creates a token
  // app.post('/signin', doSignin, Authentication.genUserTokenOnSignin)

  app.post('/signin',
    passport.authenticate('local', { session: false }), // session set to false cuz this is token based authentication
    Authentication.signin
  )

  // Authentication.signup creates a new user in DB
  app.post('/signup', Authentication.signup)
}
