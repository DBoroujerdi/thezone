'use strict';

const express = require('express');
const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

const sessionMiddleware = require('./middleware/session');

const app = express();
const port = 3000;

app.use(sessionMiddleware);

app.get('/watch', (req, res) => {
  res.send('OK');
});

app.get('/health', (_, res) => {
  res.json({status: 'UP'});
});

const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}!`);
});

module.exports = server;