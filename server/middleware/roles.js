const { admin, manager } = require('../utils/roles')

const createRoleMiddleware = role => {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send('Access denied')
    next()
  }
}

exports.admin = createRoleMiddleware(admin)
exports.manager = createRoleMiddleware(manager)
