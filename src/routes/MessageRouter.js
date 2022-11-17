const express = require("express");
const MessageController = require("../controllers/MessageController");
const Logger = require("../utils/Logger");
const router = express.Router();

router.use(async (req, res, next) => {
    // Logger.log(`REQUEST_RECIEVED ->\t{header:${JSON.stringify(req.header)}, body:${JSON.stringify(req.body)}}`);
    next();
});

router.post(`/`, async (req, res) => {
    await MessageController.create(req, res);
});

router.get(`/`, async (req, res) => {
    await MessageController.getAll(req, res);
});

router.get(`/:id`, async (req, res) => {
    await MessageController.getById(req, res);
});

router.get(`/download/:id`, async (req, res) => {
    await MessageController.downloadById(req, res);
});

router.delete(`/:id`, async (req, res) => {
    await MessageController.removeById(req, res);
})

module.exports = router;