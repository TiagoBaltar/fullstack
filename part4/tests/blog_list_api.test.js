const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

let token
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('testpassword', 10)
  const user = new User({
    username: 'tester',
    name: 'test',
    password: passwordHash,
  })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        ...blog,
        user: user,
      })
  )
  const promiseArr = blogObjs.map((blog) => blog.save())
  await Promise.all(promiseArr)
})

describe('tests on basic config', () => {
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

  test('title and url should not be empty', async () => {
    const newBlogNoTitle = {
      author: 'Myself',
      url: 'http://www.test.com',
    }

    const resTitle = await api //
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const newBlogNoUrl = {
      title: 'Test blog',
      author: 'Myself',
    }

    const resUrl = await api //
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })
})

describe('tests on operations', () => {
  test('blog is correctly deleted', async () => {
    const blogs = await helper.blogsInDb()

    const res = await api //
      .delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  })

  test('blog is correctly updated', async () => {
    const blogs = await helper.blogsInDb()
    const updatedBlog = {
      ...blogs[0],
      likes: 100,
    }

    const res = await api //
      .put(`/api/blogs/${blogs[0].id}`)
      .send(updatedBlog)
      .expect(200)

    expect(res.body.likes).toBe(100)
  })
})

describe('tests on data', () => {
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    expect(res.body.likes).toBe(0)
  })
})

describe('tests on users', () => {
  test('user with no username should return error', async () => {
    const user = {
      password: 'testPass',
    }

    const res = await api //
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('user with no password should return error', async () => {
    const user = {
      username: 'test',
    }

    const res = await api //
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('user with username < 3 characters should return error', async () => {
    const user = {
      username: 'te',
      name: 'test',
      password: 'testPass',
    }

    const res = await api //
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('user with password < 3 characters should return error', async () => {
    const user = {
      username: 'test',
      name: 'test',
      password: 'te',
    }

    const res = await api //
      .post('/api/users')
      .send(user)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
