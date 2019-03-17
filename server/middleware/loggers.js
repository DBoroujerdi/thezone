'use strict';

const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

function requestLogger(req, res, next) {
  logger.info(`REQ - Path: '${req.path}', Session: '${req.get('Session-Id')}`);
  next();
}

function errorLogger(err, req, res, next) {
  logger.error(err);
  next(err);
}

module.exports = [requestLogger, errorLogger];