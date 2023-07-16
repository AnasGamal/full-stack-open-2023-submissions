const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// TODO: implement tests in /test/useres.test.js

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username && password !== '') {
    if (username.length < 3) return response.status(400).json({
      error: 'Username must be at least 3 characters long.'
    })
    if (password.length < 3) return response.status(400).json({
      error: 'Username must be at least 3 characters long.'
    })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } else {
    return response.status(400).json({
      error: 'Both username and password must be provided.'
    })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, important:1 })
  response.json(users)
})

module.exports = usersRouter