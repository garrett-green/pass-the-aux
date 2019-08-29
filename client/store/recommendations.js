import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';

/**
 * ACTION CREATORS
 */
const getRecommendations = music => ({type: GET_RECOMMENDATIONS, music});

/**
 * THUNK CREATORS
 */
export const fetchRecommendations = user => async dispatch => {
  const {accessId, genrePicks} = user;
  try {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/recommendations',
      headers: {
        Authorization: 'Bearer ' + accessId
      },
      params: {
        limit: '100',
        market: 'US',
        seed_genres: `${genrePicks}`,
        min_popularity: '45'
      }
    }).then(response => {
      const {tracks} = response.data;
      dispatch(getRecommendations(tracks));
      return tracks;
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return action.music;

    default:
      return state;
  }
}
