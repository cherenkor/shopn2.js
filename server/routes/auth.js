const bcrypt = require('bcrypt')
const Joi = require('joi')
const router = require('express').Router()
const { User } = require('../models/User')

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password')

  res.send(user.generateAuthToken())
})

const validate = req => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required()
  }

  return Joi.validate(req, schema)
}

module.exports = router
