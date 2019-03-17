'use strict';

const sinon = require('sinon');
const uuid = require('uuid/v4');
const httpMocks = require('node-mocks-http');

const middleware = require('../../server/middleware/sessionRequired');

describe('middleware', () => {

  test('passes on request when Session-Id is present', () => {
    const sessionId = uuid();

    const req = httpMocks.createRequest({
      headers: { 'Session-Id': sessionId }
    });
    const res = httpMocks.createResponse();
    const nextSpy = sinon.spy();

    middleware(req, res, nextSpy);

    sinon.assert.calledOnce(nextSpy);
  });

  test('rejects request when Session-Id is not present', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const nextSpy = sinon.spy();

    middleware(req, res, nextSpy);

    sinon.assert.calledOnce(nextSpy);
    sinon.assert.calledWith(nextSpy, sinon.match(sinon.match.instanceOf(Error)));
  });
});