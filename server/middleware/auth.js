const config = require('config')
const jwt = require('jsonwebtoken')
const { get, split } = require('lodash')

module.exports = function(req, res, next) {
  const authHeaderArray = split(req.header('Authorization'), ' ')
  const token = get(authHeaderArray, [1])
  if (!token)
    return res.status(401).send('Access denied. No token was provided.')

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('Invalid token')
  }
}
