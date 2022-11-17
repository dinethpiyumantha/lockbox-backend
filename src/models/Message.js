const { Schema, default: mongoose } = require("mongoose");

const MessageSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    message: {
        type: Object,
        required: true
    }
}, { timestamps: true });


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;