import React, { useState } from 'react'

const BlogForm = ({ onSubmit, username, onLogout }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    onSubmit({
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="blogForm">
      <div>
        {username} logged in <button onClick={onLogout}>logout</button>
      </div>

      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input id="title" value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input id="author" value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input id="url" value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">add blog</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
