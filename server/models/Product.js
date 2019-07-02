const mongoose = require('mongoose')
const Joi = require('joi')

const schema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
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
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  images: Array,
  stock: {
    type: Number,
    default: 1,
    min: 0
  }
})

const Product = mongoose.model('Product', schema)

function validateProduct(product) {
  const schema = {
    sku: Joi.string()
      .min(3)
      .required(),
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
    price: Joi.number()
      .positive()
      .required(),
    currency: Joi.string()
      .min(3)
      .required(),
    thumbnail: Joi.string().min(3),
    categories: Joi.array().items(Joi.objectId().required()),
    images: Joi.array(),
    stock: Joi.number().positive()
  }
  return Joi.validate(product, schema)
}

exports.Product = Product
exports.validate = validateProduct
