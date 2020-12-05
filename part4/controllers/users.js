const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.username) {
    return res //
      .status(400)
      .json({ error: 'username missing' })
  }
  if (!body.name) {
    return res //
      .status(400)
      .json({ error: 'name missing' })
  }
  if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must have at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}) //
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    })
  res.json(users)
})

module.exports = usersRouter
