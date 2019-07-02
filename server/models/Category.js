const mongoose = require('mongoose')
const Joi = require('joi')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 600,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true
  }
})

const Category = mongoose.model('Category', schema)

function validateCategory(category) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(60)
      .required(),
    description: Joi.string()
      .min(3)
      .max(600)
      .required(),
    slug: Joi.string()
      .min(3)
      .max(60)
      .required(),
    thumbnail: Joi.string().min(3)
  }
  return Joi.validate(category, schema)
}

exports.Category = Category
exports.validate = validateCategory
