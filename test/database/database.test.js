'use strict';

const uuid = require('uuid/v4');
const database = require('../../server/database');

describe('database', () => {

  it('should return an empty list when no entry is present for session', () => {
    const entries = database.getStreams('sessionid');

    expect(entries).toHaveLength(0);
  });

  it('should be able to get entry for session after putting it in', () => {
    const streamId = uuid();

    database.putStream('sessionid', streamId);

    const entries = database.getStreams('sessionid');

    expect(entries).toHaveLength(1);
    expect(entries[0]).toBe(streamId);
  });

  it('should append additional stream ids to the entry list', () => {

    const streamId1 = uuid();
    const streamId2 = uuid();

    database.putStream('anothersessionid', streamId1);
    database.putStream('anothersessionid', streamId2);

    const entries = database.getStreams('anothersessionid');

    expect(entries).toHaveLength(2);
    expect(entries[0]).toBe(streamId1);
    expect(entries[1]).toBe(streamId2);
  });
});