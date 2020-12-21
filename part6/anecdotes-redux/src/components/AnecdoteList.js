import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, initAnecdotes } from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  useEffect(() => {
    props.initAnecdotes()
  }, [])

  const addVote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote anecdote={anecdote} handleClick={() => addVote(anecdote)} />
        ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter((el) =>
    el.content.toLowerCase().includes(state.filter.toLowerCase())
  )

  return { anecdotes: filteredAnecdotes }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  initAnecdotes,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
