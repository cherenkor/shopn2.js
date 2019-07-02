const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Welcome to the ShopN2.js Api service')
})

module.exports = router
