const Message = require("../models/Message");
const SecurityService = require("./SecurityService");

const MessageService = {
    create: async (message) => {
        var inserted = null;
        try {
            // console.log(message);
            var msg = {
                owner: message.owner,
                message: SecurityService.message.encrypt(message.message)
            }
            inserted = await Message.create(msg);
            // console.log(inserted);
        } catch(err) {
            console.log(err);
        }
        return inserted;
    },

    getAll: async () => {
        const messages = null;
        try {
            messages = await Message.find();
        } catch(err) {
            console.log(err);
        }
        return messages;
    },

    getById: async (id) => {
        var message = null;
        try {
            let encrypted = await Message.findById(id);
            message = encrypted;
            message = {
                owner: encrypted.owner,
                message: SecurityService.message.decrypt(encrypted.message)
            }
        } catch(err) {
            console.log(err);
        }
        return message;
    },

    removeById: async (id) => {
        var message = null;
        try {
            message = await Message.findByIdAndDelete(id);
        } catch(err) {
            console.log(err);
        }
        return message;
    },

    update: async (id, message) => {
        var latest = null;
        try {
            latest = await Message.findByIdAndUpdate(id, message);
        } catch(err) {
            console.log(err);
        }
        return latest;
    }
}

module.exports = MessageService;