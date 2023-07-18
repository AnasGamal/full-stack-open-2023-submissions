const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// using timeout with 10000ms is only workaround for network latencies
// there is probably a better implementation so that tests don't fail for timeout

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 10000)

  test('creation fails with a non unique username', async () => {

    const newUser = {
      username: 'root',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    expect(response).toMatchObject({ error: expect.anything() });
  }, 15000)

  test('creation fails with a username shorter than 3 characters', async () => {

    const newUser = {
      username: 'ro',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(response).toMatchObject({ error: expect.anything() });
  }, 10000)

  test('creation fails with a password shorter than 3 characters', async () => {

    const newUser = {
      username: 'validUsername',
      password: 'in'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(response).toMatchObject({ error: expect.anything() });
   }, 10000)

})
