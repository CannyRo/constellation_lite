require('dotenv').config()

const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')

const User = require('../models/User')
const Project = require('../models/Project')
const connectTestDB = require('./setupTestDB')

describe('Project Routes', () => {
  let adminToken

  beforeAll(async () => {
    await connectTestDB()
  })

  beforeEach(async () => {
    await User.deleteMany()
    await Project.deleteMany()

    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'admin',
        email: 'admin@test.com',
        password: '123456',
      })

    const adminUser = await User.findOne({
      email: 'admin@test.com',
    })

    adminUser.role = 'admin'
    await adminUser.save()

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: '123456',
      })

    adminToken = loginResponse.body.token
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('should return an empty projects array', async () => {
    const response = await request(app).get('/api/projects')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })

  test('should create a project when user is admin', async () => {
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Clean Water Access',
        description: 'Support access to clean water.',
        organization: 'Water Aid',
        category: 'Health',
        continent: 'Africa',
        country: 'Kenya',
        location: {
          lat: -1.286389,
          lng: 36.817223,
        },
        imageUrl: 'https://example.com/image.jpg',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe('Clean Water Access')
    expect(response.body.location.lat).toBe(-1.286389)
  })
})