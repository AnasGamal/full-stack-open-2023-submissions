import Person from './Person'

const NumbersContainer = ({filter, filteredPersons, persons}) =>{
    return (
    <ul>
    {filter 
    ? filteredPersons.map(person => <Person key={person.name} person={person} />)
    : 
    persons.map(person => <Person key={person.name} person={person} />)}
  </ul>
    )
  }
  export default NumbersContainer