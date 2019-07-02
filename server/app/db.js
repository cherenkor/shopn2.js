const mongoose = require('mongoose')
const logger = require("../utils/logger");
const dbDebugger = require('debug')('app:db')
const config = require('config')

module.exports = function() {
  const db = config.get("db");
  const mongooseConfigs = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  }

  return mongoose
    .connect(
      db,
      mongooseConfigs
    )
    .then(() => dbDebugger(`Connected to the DB:${db}`))
    .catch(err => logger.error(err.message, err))
}