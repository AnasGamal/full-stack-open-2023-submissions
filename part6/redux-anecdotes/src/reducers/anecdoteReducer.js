import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote (state, action) {
      state.push(action.payload)
    },
    incrementVoteOf (state, action) {
      return state.map(obj =>
        (obj.id === action.payload) ? { ...obj, votes: obj.votes + 1 } : obj)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    }
})

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { createAnecdote, incrementVoteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer