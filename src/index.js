const app = require("./app");
const { mongoodbConnect } = require('./configs/MongodbConfig')
const Logger = require("./utils/Logger")

const PORT = process.env.PORT || 3000
const APP_URI = process.env.APP_URI || ''
const URL = `${process.env.URL || 'http://localhost'}:${PORT}${APP_URI}`

try {
  const SSLServer = require('./security/SSLServer')

  SSLServer(app).listen(PORT, () => {
    console.clear()
    Logger.head(`${process.env.APP_NAME} server running ================`)
    Logger.link(`Root URL: https://${URL}`);
    Logger.info(`Server started with SSL Certificate 🔐`)
    mongoodbConnect()
  })
} catch (err) {
  app.listen(PORT, () => {
    console.clear()
    Logger.head(`${process.env.APP_NAME} server running ================`)
    Logger.link(`Root URL: http://${URL}`);
    Logger.warn(`Server started without SSL Certificate`)
    mongoodbConnect()
  });
}