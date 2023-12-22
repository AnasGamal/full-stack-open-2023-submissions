import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, createAnecdote, updateAnecdote } from './utils/requests'
import { useEffect, useReducer } from 'react'
import NotificationContext from './contexts/NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEWANECDOTE":
        return `New anecdote added: ${action.anecdote.content}`
    case "VOTE":
        return `Voted ${action.anecdote.content}`
    case "ERROR":
        return `Error: ${action.anecdote}`
    case "INIT":
        return false
    default:
        return state
  }
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, false)

  const setNotification = (type, anecdote) => {
    notificationDispatch({ type, anecdote})
    setTimeout(() => {
      notificationDispatch({ type: "INIT"})
    }
    , 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
     mutationFn: createAnecdote, 
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
     },
      onError: (error) => {
        if (error.response.status === 400) {
        setNotification("ERROR", "too short anecdote, must have length 5 or more")
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
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
    setNotification("VOTE", updatedAnecdote)
    console.log(updatedAnecdote)
  }

  const addAnecdote = async () => {
    const content = 'Th'
    const newAnecdote = await newAnecdoteMutation.mutateAsync({ content, votes: 0 })
    setNotification("NEWANECDOTE", newAnecdote)
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
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
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
    </NotificationContext.Provider>
  )
}

export default App
