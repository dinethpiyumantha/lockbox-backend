const express = require("express");
const MessageController = require("../controllers/MessageController");
const router = express.Router();

router.use(async (req, res, next) => {
    console.log(`REQUEST_RECIEVED ->\t{header:${JSON.stringify(req.header)}, body:${JSON.stringify(req.body)}}`);
    next();
});

router.post(`/`, async (req, res) => {
    await MessageController.upload(req, res);
});

router.get(`/`, async (req, res) => {
    await MessageController.getAll(req, res);
});

router.get(`/info/:id`, async (req, res) => {
    await MessageController.getById(req, res);
});

router.get(`/download/:id`, async (req, res) => {
    await MessageController.downloadById(req, res);
});

router.delete(`/:id`, async (req, res) => {
    await MessageController.removeById(req, res);
})

module.exports = router;