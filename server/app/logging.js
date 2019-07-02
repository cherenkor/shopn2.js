const logger = require('../utils/logger')

module.exports = function() {
  process.on("unhandledRejection", ex => {
    logger.error(ex.message, ex);
    process.exit(1);
  });
};