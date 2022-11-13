const Message = require("../models/Message")

const MessageService = {
    create: async (message) => {
        const inserted = null;
        try {
            inserted = await Message.create(message);
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
        const message = null;
        try {
            message = await Message.findById(id);
        } catch(err) {
            console.log(err);
        }
        return message;
    },

    removeById: async (id) => {
        const message = null;
        try {
            message = await Message.findByIdAndDelete(id);
        } catch(err) {
            console.log(err);
        }
        return message;
    },

    update: async (id, message) => {
        const latest = null;
        try {
            latest = await Message.findByIdAndUpdate(id, message);
        } catch(err) {
            console.log(err);
        }
        return latest;
    }
}

module.exports = MessageService;