'use strict';

const Request = require('request-promise');

let server;

beforeEach(() => {
  server = require('../server/index.js');
});

afterEach(() => {
  server.close();
});

test('health check', async () => {
  let res = await Request.get("http://localhost:3000/health");
  expect(res).toBe('{"status":"UP"}');
});