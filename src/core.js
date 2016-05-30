import {List, Map} from 'immutable';

// Vote :: Map { pair: List [String], tally: Map {String: Int} }
// State :: Map { vote: Vote, entries: List [String] }

// setEntries :: State -> List [String] -> State
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

// getWinners :: Vote -> [String]
function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) { return [a]; }
  else if (aVotes < bVotes) { return [b]; }
  else { return [a, b]; }
}

// next :: State -> State
export function next(state) {
  const winners = getWinners(state.get('vote'));
  const entries = state.get('entries').concat(winners);

  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }

  return state.merge({
    vote: Map({ pair: entries.take(2) })
  , entries: entries.skip(2)
  });
}

// vote :: State -> String -> State
export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry]
  , 0
  , tally => tally + 1
  );
}
