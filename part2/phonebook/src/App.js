import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFliter'
import PersonForm from './components/PersonForm'
import NumbersContainer from './components/NumbersContainer'
import TextHeading from './components/TextHeading'
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })

  }, [])


const addPerson = (event) => {
  event.preventDefault()
  const newPerson = {
    name: newName,
    number: newNumber,
  }
  // check if any person object already has the same name property value
  const nameExists = persons.some((person) => person.name.toLowerCase() === newPerson.name.toLowerCase());
  const numberExists = persons.some((person) => person.number === newPerson.number);
  if (nameExists) {
    if (window.confirm(`Person with name: ${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const existingPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase());
      const changedPerson = {...existingPerson, number: newPerson.number}

      personService.update(existingPerson.id, changedPerson)
      .then (returnedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
      })
    }
    return;
  }
  if (numberExists) {
    alert(`Person with number: ${newNumber} is already added to phonebook`);
    return;
  } 
  personService
  .create(newPerson)
  .then(returnedPerson => { 
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
  })
  
  
}

const handleDeleteClick = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    personService.deletePerson(person.id)
    .then(setPersons(prevPersons => prevPersons.filter(p => p.id !== person.id)))
  }
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
      <NumbersContainer filter={filter} filteredPersons={filteredPersons} persons={persons} handleDeleteClick = {handleDeleteClick} />
    </div>
  )
}

export default App