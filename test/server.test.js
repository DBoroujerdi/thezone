'use strict';

const Request = require('request-promise');

let server;

beforeAll(() => {
  server = require('../server/index.js');
});

afterAll(() => {
  server.close();
});

describe('stream service', () => {

  it('should stream content when session id header is provided', async () => {
    const opts = {
      headers: { 'Session-Id': 'sessionid' }
    };

    let res = await Request.get("http://localhost:3000/watch", opts);

    expect(res).toBe('OK, you are now streaming content.');
  });

  it('should return a health check of success when up', async () => {
    let res = await Request.get("http://localhost:3000/health");

    expect(res).toBe('{"status":"UP"}');
  });
});
