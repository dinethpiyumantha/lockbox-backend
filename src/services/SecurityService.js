const crypto = require('crypto')
const fs = require('fs')

const SECRET_KEY = crypto
  .createHash('sha256')
  .update(String(process.env.SECRET_KEY))
  .digest('base64')
  .substring(0, 32)
const ALGORITHM = process.env.ALGO || 'aes-256-ctr'

const SecurityService = {
  file: {
    encrypt: (buffer) => {
      // Create init vector
      const iv = crypto.randomBytes(16)

      // Create cipher
      const cipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv)

      // Create the new encrypted buffer
      const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()])
      return result
    },

    decrypt: (encrypted) => {
      // Get the iv (the first 16bytes)
      const iv = encrypted.slice(0, 16)

      // Get the rest
      encrypted = encrypted.slice(16)

      // Create decipher
      const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv)

      // Decrypt
      const result = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ])
      return result
    },
  },

  message: {
    encrypt: (text) => {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv)
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        }
    },
    decrypt: (hash) => {
        const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, Buffer.from(hash.iv, 'hex'))
        const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
        return decrypted.toString()
    },
  },
}

module.exports = SecurityService
