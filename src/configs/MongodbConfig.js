const mongoose = require('mongoose')
const Logger = require('../utils/Logger')

const mongoodbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      Logger.error(`Mongodb database connection cannot established`)
      return
    })
    
  mongoose.connection.on('connected', () => {
    Logger.info(`Mongodb database connection established`)
  })
}

module.exports = {
  mongoodbConnect,
}
