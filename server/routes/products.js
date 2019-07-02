const router = require('express').Router()
const { Product, validate } = require('../models/Product')

router.get('/', async (req, res) => {
  throw new Error('self-created error')
  // res.send(await Product.find().populate('categories'))
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const product = await new Product(req.body).save()
  res.send(product)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const productId = req.params.id
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true }
  )

  if (!product)
    return res.status(404).send(`No product with id ${productId} was found`)

  res.send(product)
})

router.delete('/:id', async (req, res) => {
  const productId = req.params.id
  const product = await Product.findByIdAndRemove(productId)

  if (!product)
    return res.status(404).send(`No product with id ${productId} was found`)

  res.send(product)
})

router.get('/:id', async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId).populate('categories')

  if (!product)
    return res.status(404).send(`No product with id ${productId} was found`)

  res.send(product)
})

module.exports = router
