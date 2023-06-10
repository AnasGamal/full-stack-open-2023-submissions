const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons =  [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log()
  if (person) response.json(person)
  else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id);
  
  response.status(204).end()
})

let idSet = new Set(persons.map(person => person.id))

const generateId = () => {
  let id
  do {
    id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  } while (idSet.has(id))
  idSet.add(id)
  return id;
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) return response.status(400).json({
      error: `name is missing`
    })
  else if (!body.number) return response.status(400).json({
    error: 'number is missing'})
    else if (persons.find(person => person.name === body.name)) return response.status(400).json({
      error: `name must be unique`
    })
  
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.get('/info', (request, response) => {
  let requestDate = new Date()
  response.send(
    `<div>
      <p>Phoneback has info for ${persons.length} people</p>
      <p>${requestDate}</p>
    </div>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})

app.use(express.static('build'))