import {List, Map} from 'immutable';
import {assert} from 'chai';

import {setEntries} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      assert.equal(nextState, Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts entries to immutable datastructures', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      assert.equal(nextState, Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });
});
