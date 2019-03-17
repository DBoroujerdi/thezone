const uuid = require('uuid/v4');

const sessionHeaderName = 'Session-Id';

function session(req, res, next) {

  let sessionId = req.get(sessionHeaderName);

  if (typeof sessionId === 'undefined') {
    sessionId = uuid();
    req.headers[sessionHeaderName] = sessionId;
  }

  res.set(sessionHeaderName, sessionId);

  next();
}

module.exports = session;
