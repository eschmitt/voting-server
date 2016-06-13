import {assert} from 'chai';
import io from 'socket.io-client';
import {drop, take} from 'ramda';


describe('app', () => {
  const url = 'http://localhost:8090';
  const socket = io.connect(url);

  it('emits state on connection', (done) => {
    const entries = require('./fixtures/entries.json');
    const expected = {
      entries: drop(2, entries)
    , vote: {
        pair: take(2, entries)
      }
    };

    socket.on('state', (state) => {
      assert.deepEqual(state, expected);
      done();
    });
  });
});
