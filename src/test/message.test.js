const { default: mongoose } = require('mongoose')
const request = require('supertest')
const app = require('../app')

const message = {
  owner: 'testperson',
  message: 'this is a test message',
}

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      Logger.error(`Mongodb database connection cannot established`)
      return
    })
}


describe('Message services', () => {

  dbConnect();

  let result;
  test('POST a message', (done) => {
    request(app)
      .post('/api/v1/message')
      .send(message)
      .then((res) => {
        result = res.body;
        expect(res.statusCode).toBe(200)
        done()
      })
  })

  test('GET all messages', (done) => {
    request(app)
      .get('/api/v1/messages')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })

  test('GET message by Id', (done) => {
    request(app)
      .get(`/api/v1/message/${result._id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })

  test('DELETE message by id', (done) => {
    request(app)
      .delete(`/api/v1/message/${result._id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })
})