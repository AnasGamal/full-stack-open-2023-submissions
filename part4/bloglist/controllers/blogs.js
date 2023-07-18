const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body 
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id) 
    const savedBlog = new Blog ({
      ...body,
      user: user.id
    })
    
    savedBlog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  })

module.exports = blogsRouter  