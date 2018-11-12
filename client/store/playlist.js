import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_PLAYLIST = 'CREATE_PLAYLIST'
const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST'
const SONGS_ADDED_TO_PLAYLIST = 'SONGS_ADDED_TO_PLAYLIST'

/**
 * ACTION CREATORS
 */
const setPlaylist = playlist => ({type: CREATE_PLAYLIST, playlist})
const songsAddedToPlaylist = () => ({type: ADD_TO_PLAYLIST, success: true})

/**
 * THUNK CREATORS
 */
export const createNewPlaylist = user => async dispatch => {
  console.log('user in playlist store', user)
  console.log('title in playlist store', user.playlistName)

  const accessToken = user.accessId

  const playListData = {
    name: `${user.playlistName} | By ${user.name}`,
    public: false,
    collaborative: true,
    description: `Created on ${new Date()} with Pass The Aux.`
  }

  try {
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${user.spotifyId}/playlists`,
      data: playListData,
      dataType: 'json',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const newPlaylist = response.data
      dispatch(setPlaylist(newPlaylist))
      return newPlaylist
    })
  } catch (err) {
    console.error(err)
  }
}

export const buildPlaylist = userData => async dispatch => {
  const accessToken = userData.user.accessId
  const playlistId = userData.playlist.id
  const songs = userData.songs

  console.log('userData:', userData)

  try {
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      data: {uris: songs},
      dataType: 'json',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log('finalPlaylist RESPONSE', response)
      dispatch(songsAddedToPlaylist())
    })
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return action.playlist

    case SONGS_ADDED_TO_PLAYLIST:
      return {...state, success: action.success}

    default:
      return state
  }
}
