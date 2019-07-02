const winston = require("winston");
const { createLogger, format, transports } = require('winston');
const {
  combine,
  timestamp,
  prettyPrint,
  align
} = format;

const logger = createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    timestamp(),
    align(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/logfile.log",
      level: 'error'
    })
  ]
});

logger.exceptions.handle(
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/exceptions.log"
  })
);

module.exports = logger