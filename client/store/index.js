import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import topArtists from './top-artists'
import Recommendations from './recommendations'
import newPlaylist from './playlist'
import Genres from './genres'
import SongsForPlaylist from './songsForPlaylist'

const reducer = combineReducers({user, topArtists, Recommendations, newPlaylist, Genres, SongsForPlaylist})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
