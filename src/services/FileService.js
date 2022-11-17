const Files = require('../models/File')
const { success, NA } = require('../utils/Constants')
const path = require('path')
const fs = require('fs')
const Logger = require('../utils/Logger')
const SecurityService = require('./SecurityService')

const FileService = {
  upload: async (file, info) => {
    try {
      // Create file object
      var fileObject = await Files.create({
        name: file.name,
        type: file.mimetype,
        size: file.size,
        file: NA,
        owner: info.author,
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
      // file.mv(uploadPath, async (err, result) => {
      //   if (err) {
      //     await Files.findByIdAndDelete(fileObject.id)
      //     fileObject = null
      //     throw err
      //   }
      // });

      // Write encrypted file in storage
      fs.writeFile(
        uploadPath,
        SecurityService.file.encrypt(file.data),
        async (err, file) => {
          if (err) {
            await Files.findByIdAndDelete(fileObject.id)
            fileObject = null
            Logger.error('File creation unsuccess')
          }
          if (file) {
            Logger.log('New file created')
          }
        },
      )

      return fileObject
    } catch (err) {
      console.log(err)
      return null
    }
  },

  removeById: async (id) => {
    var file = null
    try {
      // Find and get file details
      file = await Files.findById(id)

      // Set file path
      var filePath = path.join(__dirname, '..', file.file)

      if (!fs.existsSync(filePath)) {
        console.log('No such file!')
        await Files.findByIdAndRemove(file.id)
      } else {
        // Delete file from storage
        fs.unlink(filePath, (err) => {
          if (err) {
            throw err
          }

          // Delete file info from db
          Files.findByIdAndRemove(id)
        })
      }
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
    var filePath = null
    var newFile = null
    try {
      const file = await Files.findById(id)

      // Set file path
      filePath = path.join(__dirname, '..', file.file)
      decryptedFileContent = SecurityService.file.decrypt(
        fs.readFileSync(filePath),
      )
      tempPath = path.join(__dirname, '..', 'temp', id + '.temp')
      if (!fs.existsSync(tempPath)) {
        fs.writeFile(tempPath, decryptedFileContent, (err) => {
          if (err) throw err
        })
        newFile = tempPath
      } else {
        newFile = tempPath
      }
    } catch (err) {
      console.log(err)
    }
    return newFile
  },
}

module.exports = FileService
