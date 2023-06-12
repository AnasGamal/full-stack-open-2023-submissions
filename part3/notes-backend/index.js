require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

app.use(cors())
app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
  

  
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => response.json(notes))
  })
  

  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => response.json(note))
  })

  app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndRemove(request.params.id).then(result => {
      response.status(204).end()
    }
    )
    .catch(error => next(error))
  })
  
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response, next) => {
    const body = request.body
  
    const note = new Note ({
      content: body.content,
      important: body.important || false,
      id: generateId(),
    })

    note.save().then(savedNote => response.json(savedNote))
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query' })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  
  app.use(express.static('build'))

