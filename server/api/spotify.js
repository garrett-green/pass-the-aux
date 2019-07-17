const router = require('express').Router()
const SpotifyWebAPI = require('spotify-web-api-node')
const axios = require('axios')
module.exports = router

const spotifyConfig = new SpotifyWebAPI({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.SPOTIFY_CALLBACK
})

router.get('/top-artists/:accessId', async (req, res, next) => {
  const accessToken = req.params.accessId
  try {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/top/artists',
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      params: {
        limit: '50',
        time_range: 'long_term'
      }
    }).then(response => {
      const topArtistData = response.data.items
      res.json(topArtistData)
    })
  } catch (err) {
    console.error(err)
  }
})
