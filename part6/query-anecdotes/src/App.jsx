import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, createAnecdote } from './utils/requests'
import { useEffect } from 'react'

const App = () => {




  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote })
  const addAnecdote = async () => {
    const content = 'This is a new anecdote'
    const newAnecdote = await newAnecdoteMutation.mutateAsync({ content, votes: 0 })
    console.log(newAnecdote)
  }

  useEffect(() => {
    addAnecdote()
  }, [])

  const result = useQuery({
    queryKey: ['ancedotes'],
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote server is not available due to problems in server</div>
  }




  let anecdotes = []
  if (result.isSuccess) {
    anecdotes = result.data
  }

 

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
