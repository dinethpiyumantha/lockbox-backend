const Files = require("../models/File");

const FileService = {
    create: async (file) => {
        var file = null;
        try {
            file = await Files(file);
        } catch (err) {
            console.log(err);
        }
        return file;
    },

    getAll: async () => {
        var files = null;
        try {
            files = await Files.find();
        } catch (err) {
            console.log(err);
        }
        return files;
    },

    getById: async (id) => {
        var file = null;
        try {
            file = await Files.findById(id);
        } catch (err) {
            console.log(err);
        }
        return file;
    },

    update: async (file) => {
        var latest = null;
        try {
            latest = await Files.updateOne(file);
        } catch (err) {
            console.log(err);
        }
        return latest;
    },

    removeById: async (id) => {
        var file = null;
        try {
            file = await Files.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
        }
        return file;
    }
}

module.exports = FileService;