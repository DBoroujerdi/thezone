'use strict';

const database = {};

function putStream(sessionId, streamId) {
  let entry;

  if (typeof database[sessionId] === 'undefined') {
    entry = [];
  } else {
    entry = database[sessionId];
  }

  entry.push(streamId);
  database[sessionId] = entry;
}

function getStreams(sessionId) {
  if (typeof database[sessionId] === 'undefined') {
    return [];
  }

  return database[sessionId];
}

module.exports = {
  putStream,
  getStreams
};