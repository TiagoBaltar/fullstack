const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 //
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce(
    (blog, currentFav) =>
      blog.likes > currentFav.likes //
        ? blog
        : currentFav,
    {}
  )

  return favBlog
    ? {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes,
      }
    : {}
}

const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, 'author')

  // Sort items decresingly and return the 1st one
  const mostBlogs = Object.entries(count).sort((a, b) => b[1] - a[1])[0]

  return mostBlogs
    ? {
        author: mostBlogs[0],
        blogs: mostBlogs[1],
      }
    : {}
}

const mostLikes = (blogs) => {
  // first, convert data into a Map with reduce
  const mapping = blogs.reduce((blog, currBlog) => {
    let count = blog.get(currBlog.author) || 0

    blog.set(currBlog.author, currBlog.likes + count)
    return blog
  }, new Map())

  const authorLikes = !_.isEmpty(mapping)
    ? [...mapping.entries()].reduce((a, e) => (e[1] > a[1] ? e : a))
    : {}

  return authorLikes
    ? {
        author: authorLikes[0],
        likes: authorLikes[1],
      }
    : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
