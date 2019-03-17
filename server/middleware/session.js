'use strict';

const sessionHeaderName = 'Session-Id';

function middleware(req, res, next) {

  let sessionId = req.get(sessionHeaderName);

  res.set(sessionHeaderName, sessionId);

  next();
}

module.exports = middleware;
