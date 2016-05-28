import {List, Map} from 'immutable';
import {assert} from 'chai';

import {setEntries, next} from '../src/core';

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

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      assert.equal(nextState, Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later')
          })
      , entries: List.of('Sunshine')
      }));
    });
  });
});
