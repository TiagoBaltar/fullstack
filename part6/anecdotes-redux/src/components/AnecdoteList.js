import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, initAnecdotes } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((el) =>
      el.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const addVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote anecdote={anecdote} handleClick={() => addVote(anecdote)} />
        ))}
    </div>
  )
}

export default AnecdoteList
