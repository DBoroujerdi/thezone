'use strict';

const express = require('express');
const stream = require('stream');
const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

const app = express();
const port = 3000;

class Generator extends stream.Readable {

  // eslint-disable-next-line no-unused-vars
  _read(_size) {
    let random = Math.floor(Math.random() * Math.floor(100));

    this.push(new Buffer(random.toString()));
  }
}

app.get('/stream', (_, res) => {
  logger.info('connection..');
  let gen = new Generator();
  gen.pipe(res);

  res.on('close', () => {
    logger.info('closed.');
  });
});

app.get('/health', (_, res) => {
  res.json({status: 'UP'});
});

const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}!`);
});

module.exports = server;