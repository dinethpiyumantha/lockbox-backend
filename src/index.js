// Access enviroment variables
require("dotenv").config();

// Imports
const express = require("express");
const cors = require("cors");
const fileupload = require('express-fileupload');
const { notFound, appHome } = require("./utils/Constants");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());

const PORT = process.env.PORT || 3000;
const APP_URI = process.env.APP_URI || '';
const URL = `${process.env.URL || 'http://localhost'}:${PORT}${APP_URI}`;

// Routers
const fileRouter = require("./routes/FileRouter");
const { mongoodbConnect } = require("./configs/MongodbConfig");

app.use(`${APP_URI}/file`, fileRouter);

app.get(`${APP_URI}/`, (req, res) => {
    res.json(appHome).status(404);
});

app.get(`*`, (req, res) => {
    res.json(notFound).status(404);
});

app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} server running on ${URL}`);
    mongoodbConnect();
})