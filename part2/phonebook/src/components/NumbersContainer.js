import Person from './Person'

const NumbersContainer = ({filter, filteredPersons, persons, handleDeleteClick}) =>{
    return (
    <ul>
    {filter 
    ? filteredPersons.map(person => <Person key={person.id} person={person} handleDeleteClick = {handleDeleteClick} />)
    : 
    persons.map(person => <Person key={person.id} person={person} handleDeleteClick = { () => handleDeleteClick(person)} />)}
  </ul>
    )
  }
  export default NumbersContainer