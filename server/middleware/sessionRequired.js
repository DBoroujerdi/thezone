'use strict';

function middleware(req, res, next) {

  if (typeof req.get('Session-Id') === 'undefined') {
    let err = new Error('Session-Id required');
    err.statusCode = 400;
    next(err);
  } else {
    next();
  }
}

module.exports = middleware;
