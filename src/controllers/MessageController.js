const MessageService = require("../services/MessageService");
const { notFound } = require("../utils/Constants");

const MessageController = {
    create: async (req, res) => {
        const message = await MessageService.create(req.body);
        if(message) {
            res.json(message).status(200);
        } else {
            res.json(notFound).status(500);
        }
        return res;
    },

    getAll: async (req, res) => {
        const messages = await MessageService.getAll();
        if(messages) {
            res.json(messages).status(200);
        } else {
            res.json(notFound).status(500);
        }
        return res;
    },

    getById: async (req, res) => {
        const message = await MessageService.getById(req.params.id);
        if(message) {
            res.json(message).status(200);
        } else {
            res.json(notFound).status(500);
        }
        return res;
    },

    removeById: async (req, res) => {
        const message = await MessageService.removeById(req.params.id);
        if(message) {
            res.json(message).status(200);
        } else {
            res.json(notFound).status(500);
        }
        return res;
    },

    update: async (req, res) => {
        const message = await MessageService.update(req.params.id, req.body);
        if(message) {
            res.json(message).status(200);
        } else {
            res.json(notFound).status(500);
        }
        return res;
    }
}


module.exports = MessageController;