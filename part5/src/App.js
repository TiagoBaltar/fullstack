import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState('')
  const [type, setType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (loginUser) => {
    try {
      const user = await loginService.login(loginUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      sendAlert(`Logged in as ${user.name}`, 'add')
    } catch (error) {
      sendAlert(
        `wrong username or password ${error}`, //
        'error'
      )
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.add(newBlog)
      setBlogs(blogs.concat(returnedBlog))

      sendAlert(
        `${returnedBlog.title} by ${returnedBlog.author} added`, //
        'add'
      )
    } catch (error) {
      sendAlert(
        error.toString(), //
        'error'
      )
    }
  }

  const handleRemove = async (event) => {
    const blog = blogs.find((x) => x.id === event.target.id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog.id)

        setBlogs(blogs.filter((x) => x.id !== blog.id))

        sendAlert(
          `Removed ${blog.title} by ${blog.author}`, //
          'remove'
        )
      } catch (error) {
        sendAlert(
          error.toString(), //´
          'error'
        )
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLike = async (blog) => {
    let newBlog = { ...blog }
    newBlog.likes++

    const updatedBlog = await blogService.update(newBlog.id, newBlog)

    setBlogs(blogs.map((x) => (x.id !== newBlog.id ? x : updatedBlog)))
  }

  const sendAlert = (alertMsg, type) => {
    setNotification(alertMsg)
    setType(type)
    setTimeout(() => {
      setNotification('')
      setType('')
    }, 5000)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm onSubmit={handleLogin} />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create" ref={blogFormRef}>
        <BlogForm
          username={user.name}
          onLogout={handleLogout}
          onSubmit={addBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} type={type} />

      {user === null && loginForm()}
      {user !== null && blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeClick={handleLike}
            removeClick={handleRemove}
          />
        ))}
    </div>
  )
}

export default App
