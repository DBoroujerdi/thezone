'use strict';

const Request = require('request-promise');

let server;

beforeAll(() => {
  server = require('../server/index.js');
});

afterAll(() => {
  server.close();
});

const preserveResponse = (body, response) => {
  return {
    data: body,
    status: response.statusCode,
    headers: response.headers
  };
};

describe('stream service', () => {

  it('should stream content when session id header is provided', async () => {
    const opts = {
      headers: { 'Session-Id': 'sessionid' }
    };

    const res = await Request.get(`http://localhost:3000/watch`, opts);

    expect(res).toBe('OK, you are now streaming content.');
  });

  it('should not allow request without a session id', async () => {
    const opts = {
      headers: { },
      transform: preserveResponse
    };

    await Request.get('http://localhost:3000/watch', opts)
      .catch((err) => {
        expect(err.response.status).toBe(400);
      });
  });

  it('should return a health check of success when up', async () => {
    const res = await Request.get("http://localhost:3000/health");

    expect(res).toBe('{"status":"UP"}');
  });
});
