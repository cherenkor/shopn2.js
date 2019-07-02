const auth = require('../middleware/auth')
const { admin, manager } = require('../middleware/roles')
const prefix = '/api'

module.exports = function(app) {
  app.use(`${prefix}`, require('../routes/home'))
  app.use(`${prefix}/products`, [auth, admin], require('../routes/products'))
  app.use(`${prefix}/categories`, [auth, manager], require('../routes/categories'))
  app.use(`${prefix}/users`, require('../routes/users'))
  app.use(`${prefix}/auth`, require('../routes/auth'))
  app.use(require("../middleware/error.js"));
};