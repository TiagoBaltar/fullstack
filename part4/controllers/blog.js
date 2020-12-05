const blogRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}) //
    .populate('user', {
      username: 1,
      name: 1,
    })
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  const verifiedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !verifiedToken.id) {
    return status(401).json({
      error: 'token missing or invalid',
    })
  }

  const user = await User.findById(verifiedToken.id)

  if (!body.title) {
    return res.status(400).end()
  }

  if (!body.url) {
    return res.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    date: new Date(),
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  const verifiedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !verifiedToken.id) {
    return status(401).json({
      error: 'token missing or invalid',
    })
  }

  if (verifiedToken.id === blog.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } else {
    return res.status(400).json({
      error: 'only the creating user can delete this blog',
    })
  }
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
  })

  res.json(updatedBlog)
})

module.exports = blogRouter
