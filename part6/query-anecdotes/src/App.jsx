import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, createAnecdote, updateAnecdote } from './utils/requests'
import { useEffect } from 'react'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
     mutationFn: createAnecdote, 
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
     }
    })
  
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
    })

  const voteAnecdote = async (anecdote) => {
    const updatedAnecdote = await updateAnecdoteMutation.mutateAsync({ ...anecdote, votes: anecdote.votes + 1 })
    console.log(updatedAnecdote)
  }

  const addAnecdote = async () => {
    const content = 'This is a new anecdote'
    const newAnecdote = await newAnecdoteMutation.mutateAsync({ content, votes: 0 })
    console.log(newAnecdote)
  }

  useEffect(() => {
    addAnecdote()
  }, [])

 
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
    voteAnecdote(anecdote)
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
