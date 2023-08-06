import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer';

const AnecdoteList = () => { 
    const anecdotes = useSelector(state =>
      {
      if (state.filter === '') {
        return state.anecdotes
      }
      else {
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      }
    })

    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementVoteOf(id))
      }

    return anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList