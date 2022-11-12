// Access enviroment variables
require("dotenv").config();

// Imports
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;
const URL = `${process.env.URL || 'http://localhost'}:${PORT}`

app.get('*', (req, res) => {
    res.json({
        code: '404',
        message: 'Not found'
    }).status(404);
});

app.listen(PORT, () => {
    console.log(`\n${process.env.APP_NAME} server running on ${URL}\n`);
})