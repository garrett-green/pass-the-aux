import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GENRES = 'GET_GENRES'

/**
 * ACTION CREATORS
 */
const getGenres = genres => ({type: GET_GENRES, genres})

/**
 * THUNK CREATORS
 */
export const fetchGenres = () => async dispatch => {
    try {
      const response = await axios.get('/api/genres')
      const genres = response.data
      dispatch(getGenres(genres))
    } catch (err) {
      console.error(err)
    }
}

const defaultState = {}

/**
 * REDUCER
 */
export default function(state = [], action) {

  switch (action.type) {

    case GET_GENRES:
      return action.genres

    default:
      return state
  }
}
