import React, { useEffect } from 'react'
import { useField } from './hooks/useField'
import { useResource } from './hoost/useResource'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.get()
    personService.get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    if (content.value) {
      noteService.create({ content: content.value })
    }
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    if (name.value || number.value) {
      personService.create({ name: name.value, number: number.value })
    }
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
