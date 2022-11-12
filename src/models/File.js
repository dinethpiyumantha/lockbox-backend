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
        required: true
    },
    note: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Files = mongoose.model('Files', FilesSchema);
module.exports = Files;