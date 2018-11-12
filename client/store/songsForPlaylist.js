import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST'

/**
 * ACTION CREATORS
 */
const addSongToPlaylistCreator = song => ({type: ADD_TO_PLAYLIST, song})

/**
 * THUNK CREATORS
 */

export const addSongToPlaylist = song => async dispatch => {
  await dispatch(addSongToPlaylistCreator(song.uri))
  song.addedToPlaylist = true
  return song
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_PLAYLIST:
      return [...state, action.song]

    default:
      return state
  }
}
