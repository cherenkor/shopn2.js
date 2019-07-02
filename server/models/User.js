const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
const { values } = require('lodash')
const roles = require('../utils/roles')
const rolesArr = values(roles)

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: rolesArr
  }
})

schema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role
    },
    config.get('jwtPrivateKey')
  )
  return token
}

const User = mongoose.model('User', schema)

function validateUser(user) {
  /**
   This regular expression can be used for validating a strong password.
   It expects at least 1 lowercase letter, 1 uppercase letter, and 1 digit.
   It will also allow for some special characters.
   The length should be greater than 8 characters.
   The sequence of the characters is not important.
   */
  const complexPassword = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/

  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .regex(complexPassword)
      .required()
      .label(
        'Password should be longer than 8 characters and it should be at least 1 lowercase letter, 1 uppercase letter, and 1 digit'
      ),
    role: Joi.string()
      .valid(rolesArr)
      .required()
  }
  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
