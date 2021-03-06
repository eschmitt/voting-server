import {List, Map} from 'immutable';
import {assert} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      const expected = Map({
        entries: List.of('Trainspotting', '28 Days Later')
      });

      assert.equal(nextState, expected);
    });

    it('converts entries to immutable datastructures', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      const expected = Map({
        entries: List.of('Trainspotting', '28 Days Later')
      });

      assert.equal(nextState, expected);
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      const expected = Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later')
          })
      , entries: List.of('Sunshine')
      });

      assert.equal(nextState, expected);
    });

    it('puts winner of current vote back into entries', () => {
      const state = Map({
        vote: Map({
          pair: List(['Trainspotting', '28 Days Later'])
        , tally: Map({
            'Trainspotting': 4
          , '28 Days Later': 2
          })
        })
      , entries: List(['Sunshine', 'Millions', '127 Hours'])
      });
      const nextState = next(state);
      const expected = Map({
        vote: Map({
          pair: List(['Sunshine', 'Millions'])
        })
      , entries: List(['127 Hours', 'Trainspotting'])
      });

      assert.equal(nextState, expected);
    });

    it('puts both from tied vote back into entries', () => {
      const state = Map({
        vote: Map({
          pair: List(['Trainspotting', '28 Days Later'])
        , tally: Map({
            'Trainspotting': 2
          , '28 Days Later': 2
          })
        })
      , entries: List(['Sunshine', 'Millions', '127 Hours'])
      });
      const nextState = next(state);
      const expected = Map({
        vote: Map({
          pair: List(['Sunshine', 'Millions'])
        })
      , entries: List(['127 Hours', 'Trainspotting', '28 Days Later'])
      });

      assert.equal(nextState, expected);
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List(['Trainspotting', '28 Days Later'])
        , tally: Map({
            'Trainspotting': 4
          , '28 Days Later': 2
          })
        })
      , entries: List()
      });
      const nextState = next(state);
      const expected = Map({
        winner: 'Trainspotting'
      });
      
      assert.equal(nextState, expected);
    });
  });

  describe('vote', () => {
    const pair = List(['Trainspotting', '28 Days Later']);

    it('creates a tally for the voted entry', () => {
      const state = Map({ pair: pair });
      const nextState = vote(state, pair.first());
      const expected = Map({
        pair: pair
      , tally: Map({ 'Trainspotting': 1 })
      });

      assert.equal(nextState, expected);
    });
    
    it('adds to existing tally of the voted entry', () => {
      const state = Map({
        pair: pair
      , tally: Map({
          'Trainspotting': 3
        , '28 Days Later': 2
        })
      });
      const nextState = vote(state, pair.first());
      const expected = Map({
        pair: pair
      , tally: Map({
          'Trainspotting': 4
        , '28 Days Later': 2
        })
      });

      assert.equal(nextState, expected);
    });
  });
});
