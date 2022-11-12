const Files = require('../models/File')
const { success, NA } = require('../utils/Constants')
const path = require('path')
const fs = require("fs");

const FileService = {
  upload: async (file) => {
    try {
      // Create file object
      var fileObject = await Files.create({
        name: file.name,
        type: file.mimetype,
        size: file.size,
        file: NA,
        author: NA,
      })

      //   Create file name with file extention
      var fileName = fileObject.id + path.extname(file.name)

      // File upload path
      const uploadPath = path.join(__dirname, '..', '/storage/', fileName)

      // Update file path in db
      fileObject = await Files.findByIdAndUpdate(fileObject.id, {
        file: '/storage/' + fileName,
      })

      // Upload file into storage
      file.mv(uploadPath, async (err, result) => {
        if (err) {
          this.removeById(fileObject.id)
          fileObject = null
          throw err
        }
      })

      return fileObject
    } catch (err) {
      console.log(err)
      return null
    }
  },

  removeById: async (id) => {
    var file = null;
    try {

      // Find and get file details
        file = await Files.findById(id);    

        // Set file path
        var filePath = path.join(__dirname, "..", file.file);

        // Delete file from storage
        fs.unlink(filePath, (err) => {
            if(err) {
                throw err;
            }

            // Delete file info from db
            Files.findByIdAndRemove(id);
        });
    } catch (err) {
      console.log(err)
    }
    return file
  },

  getAll: async () => {
    var files = null
    try {
      files = await Files.find()
    } catch (err) {
      console.log(err)
    }
    return files
  },

  getById: async (id) => {
    var file = null
    try {
      file = await Files.findById(id)
    } catch (err) {
      console.log(err)
    }
    return file
  },

  downloadById: async (id) => {
    var filePath = null;
    try {
      const file = await Files.findById(id)
      // Set file path
      filePath = path.join(__dirname, "..", file.file);
    } catch (err) {
      console.log(err)
    }
    return filePath;
  },
}

module.exports = FileService
