import {List, Map} from 'immutable';
import {assert} from 'chai';

import {setEntries, next, vote} from '../src/core';

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

  describe('vote', () => {
    const movies = ['Trainspotting', '28 Days Later'];

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of(movies[0], movies[1])
        })
      , entries: List()
      });
      const nextState = vote(state, movies[0]);

      assert.equal(nextState, Map({
        vote: Map({
          pair: List.of(movies[0], movies[1])
        , tally: Map({ 'Trainspotting': 1 })
        })
      , entries: List()
      }));
    });
    
    it('adds to existing tally of the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of(movies[0], movies[1])
        , tally: Map({
            'Trainspotting': 3
          , '28 Days Later': 2
          })
        })
      , entries: List()
      });
      const nextState = vote(state, movies[0]);
    
      assert.equal(nextState, Map({
        vote: Map({
          pair: List.of(movies[0], movies[1])
        , tally: Map({
            'Trainspotting': 4
          , '28 Days Later': 2
          })
        })
      , entries: List()
      }));
    });
  });
});
