import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import topArtists from './top-artists';
import recommendations from './recommendations';
import playlist from './playlist';
import genres from './genres';
import songsForPlaylist from './songsForPlaylist';

const reducer = combineReducers({
  user,
  topArtists,
  recommendations,
  playlist,
  genres,
  songsForPlaylist
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
