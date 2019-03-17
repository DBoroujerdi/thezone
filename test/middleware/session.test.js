'use strict';

const sessionMiddleware = require('../../server/middleware/session');
const sinon = require('sinon');
const uuid = require('uuid/v4');
const httpMocks = require('node-mocks-http');

describe('middleware', () => {

  test('adds session id to the res headers', () => {
    const sessionId = uuid();
    const req = httpMocks.createRequest({
      headers: { 'Session-Id': sessionId }
    });
    const res = httpMocks.createResponse();
    const nextSpy = sinon.spy();

    sessionMiddleware(req, res, nextSpy);

    expect(nextSpy.calledOnce).toBe(true);
    expect(res.get('Session-Id')).toBe(sessionId);
  });
});