const mongoose = require("mongoose");

const mongoodbConnect = async () => {
    try {
        mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`Mongodb database connection established`);
    } catch (err) {
        console.log(`Error: Mongodb database connection cannot established`);
    }
};

module.exports = {
    mongoodbConnect
}