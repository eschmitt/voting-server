import {assert} from 'chai';
import io from 'socket.io-client';
import {drop, take} from 'ramda';


describe('app', () => {
  const url = 'http://localhost:8090';
  const socket = io.connect(url);

  it('emits state on connection', (done) => {
    const entries = require('./fixtures/entries.json');
    const expected = {
      entries: entries
    };

    socket.on('error', (err) => {
      console.dir(err);
      done();
    });

    socket.on('state', (state) => {
      assert.deepEqual(state, expected);
      done();
    });
  });
});
