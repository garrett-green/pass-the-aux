import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TOP_ARTISTS = 'GET_TOP_ARTISTS'

/**
 * ACTION CREATORS
 */
const getTopArtists = topArtists => ({type: GET_TOP_ARTISTS, topArtists})

/**
 * THUNK CREATORS
 */
export const fetchArtists = user => async dispatch => {
  const response = await axios.get(`/api/spotify/top-artists/${user.accessId}`);
  console.log('RESPONSE FROM THUNK REQUEST', response);
  const userTopArtists = response.data
  dispatch(getTopArtists(userTopArtists))
  return userTopArtists
}

const defaultState = {}

/**
 * REDUCER
 */
export default function(state = [], action) {

  switch (action.type) {

    case GET_TOP_ARTISTS:
      return action.topArtists

    default:
      return state
  }
}
