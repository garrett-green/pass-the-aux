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
  const accessToken = user.accessId
  const genres = user.genrePicks
  try {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/recommendations',
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      params: {
        limit: '100',
        market: 'US',
        seed_genres: `${genres}`,
        min_popularity: '45'
      }
    }).then(response => {
      const recommendedSongs = response.data.tracks
      dispatch(getRecommendations(recommendedSongs))
      return recommendedSongs
    })
  } catch (err) {
    console.error(err)
  }
}

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
