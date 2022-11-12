const express = require("express");
const FileController = require("../controllers/FileController");
const router = express.Router();

router.use(async (req, res, next) => {
    console.log(`REQUEST_RECIEVED ->\t{header:${JSON.stringify(req.header)}, body:${JSON.stringify(req.body)}}`);
    next();
});

router.post(`/`, async (req, res) => {
    await FileController.upload(req, res);
});

router.get(`/`, async (req, res) => {
    await FileController.getAll(req, res);
});

router.get(`/info/:id`, async (req, res) => {
    await FileController.getById(req, res);
});

router.get(`/download/:id`, async (req, res) => {
    await FileController.downloadById(req, res);
});

router.delete(`/:id`, async (req, res) => {
    await FileController.removeById(req, res);
})

module.exports = router;