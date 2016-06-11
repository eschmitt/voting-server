import {assert} from 'chai';
import io from 'socket.io-client';

const url = 'localhost:8090';
const options = {
  transports: ['websockets']
, 'force new connection': true
};

describe('app', () => {
  const client = io.connect(url, options);

  it('emits state on connection', (done) => {
    const expected = {
      entries: require('./fixtures/entries.json')
    };

    client.on('connection', (data) => {
      assert.equal(data, expected);
      done();
    });
  });
});
