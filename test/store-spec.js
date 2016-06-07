import {Map, fromJS} from 'immutable';
import {assert} from 'chai';
import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with correct reducer', () => {
    const store = makeStore();
    const entries = ['Trainspotting', '28 Days Later'];
    assert.equal(store.getState(), Map());

    store.dispatch({type: 'SET_ENTRIES', entries: entries});
    assert.equal(store.getState(), fromJS({ entries: entries }));
  });
});
