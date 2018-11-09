import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_PLAYLIST = 'CREATE_PLAYLIST'

/**
 * ACTION CREATORS
 */
// const getRecommendations = music => ({type: GET_RECOMMENDATIONS, music})

/**
 * THUNK CREATORS
 */
export const createNewPlaylist = user => async dispatch =>  {

  const accessToken = user.accessId;

    const playListData = {
      name: `Pass The Aux - v1 | By ${user.name}`,
      public: false,
      collaborative: true
    }

    try {
      axios({
        method: "post",
        url: `https://api.spotify.com/v1/users/${user.spotifyId}/playlists`,
        data: playListData,
        dataType: 'json',
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log('RESPONSE.DATA', response.data)
          // console.log('*****WHOLE RESPONSE*****', response)
          // const newPlaylist = response.data
          // res.json(newPlaylist)
        })
    } catch (err) {
      console.error(err)
    }
}

// export const createNewPlaylist = user => async dispatch =>  {
//   const response = await axios.post(`api/spotify/make-playlist/`, {user});
//   console.log('RESPONSE FROM PLAYLIST THUNK REQUEST', response);
//   const newPlaylist = response.data;
//   return newPlaylist;
// }

const defaultState = {}

/**
 * REDUCER
 */
export default function(state = [], action) {

  switch (action.type) {

    // case GET_RECOMMENDATIONS:
    //   return action.music

    default:
      return state
  }
}
