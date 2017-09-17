const express = require('express')
const passport = require('passport')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./router')
const app = express()

// DB Setup
mongoose.connect('mongodb://localhost/medicare')

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
// app.use(bodyParser.urlencoded({ extended: true })) -- security
app.use(passport.initialize())
router(app)


// Server Setup
const port = process.env.PORT || 3050
const server = http.createServer(app)
server.listen(port, () => {
  console.log('Server listening at %s', port)
})
