'use strict';

const express = require('express');
const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const uuid = require('uuid/v4');
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

const middleware = require('./middleware');
const database = require('./database');

const app = express();

app.use(...middleware.loggers);

const streamMiddleware = [
  middleware.requireSessionId,
  middleware.echoSessionHeader
];

app.get('/watch', ...streamMiddleware, (req, res) => {
  const sessionId = req.get('Session-Id');
  const streamId = uuid();

  try {
    database.putStream(sessionId, streamId);
  } catch(err) {
    res.err(err);
    return;
  }

  res.send('OK, you are now streaming content.');
});

app.get('/health', (_, res) => {
  res.json({status: 'UP'});
});

const port = 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}!`);
});

module.exports = server;
