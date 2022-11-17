// Access enviroment variables
require('dotenv').config()

// Imports
const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const { notFound, appHome } = require('./utils/Constants')
const fs = require('fs')
const path = require('path')
const Logger = require('./utils/Logger')
const { mongoodbConnect } = require('./configs/MongodbConfig')



const app = express()

app.use(cors())
app.use(express.json())
app.use(fileupload())

const APP_URI = process.env.APP_URI || ''

// Routers
const fileRouter = require('./routes/FileRouter')
const messageRouter = require('./routes/MessageRouter')

app.use(`${APP_URI}/file`, fileRouter)
app.use(`${APP_URI}/message`, messageRouter)

app.get(`${APP_URI}/`, (req, res) => {
  res.json(appHome).status(404)
})

app.get(`*`, (req, res) => {
  res.json(notFound).status(404)
})

const CERT_PATH = path.join(
  __dirname,
  'security',
  'certificate',
  'certificate.pem',
)

module.exports = app;