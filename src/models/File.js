const { Schema, default: mongoose } = require("mongoose");

/**
 * File Model
 * @author regex
 */
const FilesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Files = mongoose.model('Files', FilesSchema);
module.exports = Files;