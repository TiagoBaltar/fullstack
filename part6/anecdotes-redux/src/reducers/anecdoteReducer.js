import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW':
      return [...state, action.data]

    case 'VOTE':
      return state.map((anec) =>
        anec.id === action.data.id ? action.data : anec
      )

    case 'INIT':
      return action.data

    default:
      console.log('Default')
      return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      data: {
        content: updatedAnecdote.content,
        id: updatedAnecdote.id,
        votes: updatedAnecdote.votes,
      },
    })
  }
}

export const initAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
