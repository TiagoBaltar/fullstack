const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArr = blogObjs.map((blog) => blog.save())

  await Promise.all(promiseArr)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog identifier is named id', async () => {
  const blogs = await helper.blogsInDb()
  const res = await api.get(`/api/blogs/${blogs[0].id}`)
  expect(res.body.id).toBeDefined()
})

test('blog is created with correct data', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Myself',
    url: 'http://www.test.com',
    likes: 5,
  }

  const res = await api //
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  expect(res.body.title).toEqual(newBlog.title)
  expect(res.body.author).toEqual(newBlog.author)
  expect(res.body.url).toEqual(newBlog.url)
  expect(res.body.likes).toEqual(newBlog.likes)

  const blogs = await helper.blogsInDb()
  expect(blogs.length).toEqual(helper.initialBlogs.length + 1)
})

test('blog defaults likes param to zero', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Myself',
    url: 'http://www.test.com',
  }

  const res = await api //
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  expect(res.body.likes).toBe(0)
})

test('title and url should not be empty', async () => {
  const newBlogNoTitle = {
    author: 'Myself',
    url: 'http://www.test.com',
  }

  const resTitle = await api //
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)

  const newBlogNoUrl = {
    title: 'Test blog',
    author: 'Myself',
  }

  const resUrl = await api //
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)
})

test('blog is correctly deleted', async () => {
  const blogs = await helper.blogsInDb()
  const res = await api //
    .delete(`/api/blogs/${blogs[0].id}`)
    .expect(204)
})

test('blog is correctly updated', async () => {
  const blogs = await helper.blogsInDb()
  const updatedBlog = {
    ...blogs[0],
    likes: 100,
  }

  const res = await api //
    .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
    .send(updatedBlog)
    .expect(200)

  expect(res.body.likes).toBe(100)
})

afterAll(() => {
  mongoose.connection.close()
})
