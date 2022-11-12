// Access enviroment variables
require("dotenv").config();

// Imports
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} server running on ${process.env.URL}:${PORT}`);
})