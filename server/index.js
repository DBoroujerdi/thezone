'use strict';

const express = require('express');
const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

const middleware = require('./middleware');

const app = express();

app.use(...middleware.loggers);

const streamMiddleware = [
  middleware.requireSessionId,
  middleware.echoSessionHeader
];

app.get('/watch', ...streamMiddleware, (req, res) => {
  res.send('OK');
});

app.get('/health', (_, res) => {
  res.json({status: 'UP'});
});

const port = 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}!`);
});

module.exports = server;