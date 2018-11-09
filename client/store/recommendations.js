import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'

/**
 * ACTION CREATORS
 */
const getRecommendations = music => ({type: GET_RECOMMENDATIONS, music})

/**
 * THUNK CREATORS
 */
export const fetchRecommendations = user => async dispatch => {
  const response = await axios.get(`/api/spotify/recommended-music/${user.accessId}`);
  console.log('RESPONSE FROM THUNK REQUEST', response);
  const recommendedMusic = response.data
  dispatch(getRecommendations(recommendedMusic))
  return recommendedMusic
}

const defaultState = {}

/**
 * REDUCER
 */
export default function(state = [], action) {

  switch (action.type) {

    case GET_RECOMMENDATIONS:
      return action.music

    default:
      return state
  }
}
