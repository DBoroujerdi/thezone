'use strict';

const sessionMiddleware = require('../../server/middleware/session');
const sinon = require('sinon');
const uuid = require('uuid/v4');
const validate = require('uuid-validate');
const httpMocks = require('node-mocks-http');

describe('middleware', () => {

  describe('session id present on req headers', () => {
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

  describe('no session id present in req headers', () => {

    test('generates new session id and adds it to the res headers', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const nextSpy = sinon.spy();

      sessionMiddleware(req, res, nextSpy);

      expect(nextSpy.calledOnce).toBe(true);

      const isValidUuid = validate(res.get('Session-Id'), 4);
      expect(isValidUuid).toBe(true);
    });
  });
});