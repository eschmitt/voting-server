import Server from 'socket.io';
import {curry, compose} from 'ramda';

// K :: a -> (_ -> a)
const K = (x) => () => x;

// emitState :: Redux Store -> Socket -> IO && Socket
const emitState = curry((store, socket) => {
  socket.emit('state', store.getState().toJS());
  return socket;
});

// dispatch :: Redux Store -> Socket -> IO && Socket
const dispatch = curry((store, socket) => {
  socket.on('action', store.dispatch.bind(store));
  return socket;
});

// startServer :: Redux Store -> IO
export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(compose(emitState(store), K(io)));

  io.on('connection', compose(dispatch(store), emitState(store)));
};
