import {Map, fromJS} from 'immutable';
import {assert} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const state = Map();
    const entries = ['Trainspotting'];
    const action = {type: 'SET_ENTRIES', entries: entries};
    const nextState = reducer(state, action);
    const expected = fromJS({entries: entries})

    assert.equal(nextState, expected); 
  });

  it('handles NEXT', () => {
    const entries = ['Trainspotting', '28 Days Later'];
    const state = fromJS({entries: entries});
    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);
    const expected = fromJS({
      vote: { pair: entries }
    , entries: []
    });

    assert.equal(nextState, expected);
  });

  it('handles VOTE', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const state = fromJS({
      vote: { pair: pair }
    , entries: []
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);
    const expected = fromJS({
      vote: {
        pair: pair
      , tally: { 'Trainspotting': 1 }
      }
    , entries: []
    })

    assert.equal(nextState, expected);
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']}
    , {type: 'NEXT'}
    , {type: 'VOTE', entry: 'Trainspotting'}
    , {type: 'VOTE', entry: '28 Days Later'}
    , {type: 'VOTE', entry: 'Trainspotting'}
    , {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());
    const expected = Map({ winner: 'Trainspotting' });

    assert.equal(finalState, expected);
  });
});
