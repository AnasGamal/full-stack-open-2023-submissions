import { useState } from 'react'
import SearchFilter from './components/SearchFliter'
import PersonForm from './components/PersonForm'
import NumbersContainer from './components/NumbersContainer'
import TextHeading from './components/TextHeading'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [filter, setFilter] = useState('')

const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber,
  }
  // check if any person object already has the same name property value
  const nameExists = persons.some((person) => person.name.toLowerCase() === personObject.name.toLowerCase());
  const numberExists = persons.some((person) => person.number === personObject.number);
  if (nameExists) {
    alert(`Person with name: ${newName} is already added to phonebook`);
    return;
  }
  if (numberExists) {
    alert(`Person with number: ${newNumber} is already added to phonebook`);
    return;
  } 
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFliter = (event) => {
  // store filter taken from event and convert it to lower case
  const currentFilter = event.target.value.toLowerCase();
  setFilter(currentFilter)
  setFilteredPersons(persons.filter(
    person => person.name.toLowerCase().includes(currentFilter)
    ));
}


  return (
    <div>
      <TextHeading title='Phonebook' />
      <SearchFilter filter={filter} handleFliter={handleFliter} />
      <TextHeading title='add a new' />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <TextHeading title='Numbers' />
      <NumbersContainer filter={filter} filteredPersons={filteredPersons} persons={persons} />
    </div>
  )
}

export default App