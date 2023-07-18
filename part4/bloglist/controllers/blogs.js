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

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body 
  const user = request.user
  
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

  
blogsRouter.delete('/:id', async (request, response, next) => {
  const user = request.user


  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blogToDelete.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized: Only the creator can delete the blog' })
  }

  try {
    await Blog.findByIdAndDelete(blogToDelete.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter  