const https = require('https')
const fs = require('fs')
const path = require('path')

const getPrivateKey = () => {
  let res
  try {
    const temp = fs.readFileSync(
      path.join(__dirname, 'certificate', 'private_key.pem'),
    )
    res = temp
  } catch (err) {
    throw err
    res = null
  }
  return res
}

const getCertificate = () => {
  let res
  try {
    const temp = fs.readFileSync(
      path.join(__dirname, 'certificate', 'certificate.pem'),
    )
    res = temp
  } catch (err) {
    throw err
    res = null
  }
  return res
}

const config = {
  key: getPrivateKey(),
  cert: getCertificate(),
}

const SSLServer = (app) => {
    try {
     var server = https.createServer(config, app)
     return server;
    } catch(err) {
        throw err
    }
}

module.exports = SSLServer
