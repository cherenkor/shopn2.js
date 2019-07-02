const router = require('express').Router()
const { Category, validate } = require('../models/Category')

router.get('/', async (req, res) => {
  res.send(await Category.find())
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const category = await new Category(req.body).save()
  res.send(category)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const categoryId = req.params.id
  const category = await Category.findByIdAndUpdate(
    {
      _id: categoryId
    },
    req.body,
    {
      new: true
    }
  )

  if (!category)
    return res.status(404).send(`No category with id ${categoryId} was found`)

  res.send(category)
})

router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id
  const category = await Category.findByIdAndRemove(categoryId)

  if (!category)
    return res.status(404).send(`No category with id ${categoryId} was found`)

  res.send(category)
})

router.get('/:id', async (req, res) => {
  const categoryId = req.params.id
  const category = await Category.findById(categoryId)

  if (!category)
    return res.status(404).send(`No category with id ${categoryId} was found`)

  res.send(category)
})

module.exports = router
