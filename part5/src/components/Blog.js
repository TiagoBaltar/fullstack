import React, { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, likeClick, removeClick }) => {
  const blogRef = useRef()

  const handleLike = () => {
    likeClick(blog)
  }

  return (
    <div className="blog" id="blogDiv">
      <div className="defaultView">
        {blog.title} {blog.author}
        <Togglable buttonLabel="view" hideLabel="hide" ref={blogRef}>
          <p>
            likes {blog.likes}{' '}
            <button className="likeButton" onClick={handleLike}>
              like
            </button>
          </p>
          <p>{blog.url}</p>
          <p>
            <button id={blog.id} onClick={removeClick}>
              remove
            </button>
          </p>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
