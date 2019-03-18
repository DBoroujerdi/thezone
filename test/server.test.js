'use strict';

const axios = require('axios');
const uuid = require('uuid/v4');

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
      headers: { 'Session-Id': uuid() }
    };

    const res = await axios.get(`http://localhost:3001/watch`, opts);

    expect(res.data).toBe('OK, you are now streaming content.');
  });

  it('should not allow request without a session id', async (done) => {
    const opts = {
      headers: {}
    };

    try {
      await axios.get('http://localhost:3001/watch', opts);
    } catch (err) {
      expect(err.response.status).toBe(400);
      return done();
    }
    done.fail('should have failed.');
  });

  it('should prevent a user with a session id to watch more than 3 streams', async (done) => {
    const opts = {
      headers: { 'Session-Id': uuid() }
    };

    const res0 = await axios.get(`http://localhost:3001/watch`, opts);
    expect(res0.status).toBe(200);

    const res1 = await axios.get(`http://localhost:3001/watch`, opts);
    expect(res1.status).toBe(200);

    const res2 = await axios.get(`http://localhost:3001/watch`, opts);
    expect(res2.status).toBe(200);

    try {
      await axios.get('http://localhost:3001/watch', opts);
    } catch (err) {
      expect(err.response.status).toBe(401);
      return done();
    }
    done.fail('should have failed.');
  });

  it('should return a health check of success when up', async () => {
    const res = await axios.get("http://localhost:3001/health");

    expect(res.status).toBe(200);
    expect(res.data).toEqual({"status":"UP"});
  });
});
