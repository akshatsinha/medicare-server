const passport = require('passport')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const agencyCtrl = require('./controllers/agency')
const officeCtrl = require('./controllers/office')

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

  // requireSignin verifies email/pwd. Authentication.genUserTokenOnSignin creates a token
  // app.post('/signin', doSignin, Authentication.genUserTokenOnSignin)

  app.post('/signin',
    passport.authenticate('local', { session: false }), // session set to false cuz this is token based authentication
    Authentication.signin
  )

  // Authentication.signup creates a new user in DB
  app.post('/signup', Authentication.signup)
}
