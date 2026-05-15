
const request = require('supertest')
const mongoose = require('mongoose')

require('dotenv').config()
const connectTestDB = require('./setupTestDB')

const app = require('../app')

const User = require('../models/User')

describe('Auth Routes', () => {
  beforeAll(async () => {
    await connectTestDB()
  })

  beforeEach(async () => {
    await User.deleteMany()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@test.com',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)

    expect(response.body.message).toBe(
      'User created successfully'
    )

    expect(response.body.user.email).toBe(
      'test@test.com'
    )
  })

  test('should login an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@test.com',
        password: '123456',
      })

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      })

    expect(response.statusCode).toBe(200)

    expect(response.body.token).toBeDefined()
  })
})