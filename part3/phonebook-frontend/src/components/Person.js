const Person = ({person, handleDeleteClick}) => {

return (
    <div>
    <li>{person.name} {person.number}</li>
    <button type="button" onClick={() => handleDeleteClick(person)}>delete</button>
    </div>
)}

export default Person