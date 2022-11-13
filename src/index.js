// Access enviroment variables
require('dotenv').config()

// Imports
const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const { notFound, appHome } = require('./utils/Constants')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileupload())

const PORT = process.env.PORT || 3000
const APP_URI = process.env.APP_URI || ''
const URL = `${process.env.URL || 'http://localhost'}:${PORT}${APP_URI}`

// Routers
const fileRouter = require('./routes/FileRouter')
const messageRouter = require('./routes/MessageRouter')
const { mongoodbConnect } = require('./configs/MongodbConfig')

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

try {
  const SSLServer = require('./security/SSLServer')

  SSLServer(app).listen(PORT, () => {
    console.log(`${process.env.APP_NAME} server running on https://${URL}`)
    console.log(`Server started with SSL Certificate`)
    mongoodbConnect()
  })
} catch (err) {
  app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} server running on http://${URL}`)
    console.log(`Server started without SSL Certificate`)
    mongoodbConnect()
  });
}
