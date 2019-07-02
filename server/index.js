const logger = require('./utils/logger')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("./app/logging")();
require("./app/validation")();
require("./app/config")();
require("./app/middlewares")(app);
require("./app/routes")(app);
require("./app/db")();

const server = app.listen(PORT, () =>
  logger.info(`Server listening on port ${PORT}`)
);

module.exports = server;