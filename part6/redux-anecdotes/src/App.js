import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, incrementVoteOf } from './reducers/anecdoteReducer';
// import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }



  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App