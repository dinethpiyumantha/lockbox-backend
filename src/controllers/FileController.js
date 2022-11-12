const FileService = require("../services/FileService");
const { nullObjectJson } = require("../utils/Constants");

const FileController = {
    upload: async (req, res) => {
        const file = await FileService.upload(req.files.file);
        if(file) {
            res.json(file).status(200);
        } else {
            res.json(nullObjectJson).status(500);
        }
        return res;
    },

    getAll: async (req, res) => {
        const files = await FileService.getAll();
        if(files) {
            res.json(files).status(200);
        } else {
            res.json(nullObjectJson).status(500);
        }
        return res;
    },

    getById: async (req, res) => {
        const file = await FileService.getById(req.params.id);
        if(file) {
            res.json(file).status(200)
        } else {
            res.json(nullObjectJson).status(500);
        }
        return res;
    },

    downloadById: async (req, res) => {
        const file = await FileService.downloadById(req.params.id);
        if(file) {
            res.download(file)
        } else {
            res.json(nullObjectJson).status(500);
        }
        return res;
    },

    removeById: async (req, res) => {
        const file = await FileService.removeById(req.params.id);
        if(file) {
            res.json(file).status(200)
        } else {
            res.json(nullObjectJson).status(500);
        }
        return res;
    }
}

module.exports = FileController;