const mongoose = require("mongoose");
const Logger = require("../utils/Logger");

const mongoodbConnect = async () => {
    try {
        mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        Logger.info(`Mongodb database connection established`);
    } catch (err) {
        console.log(`Error: Mongodb database connection cannot established`);
    }
};

module.exports = {
    mongoodbConnect
}