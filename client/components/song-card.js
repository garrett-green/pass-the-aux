import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Card, Image} from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import {addSongToPlaylist} from '../store/songsForPlaylist'

const mapState = state => {
  console.log('STATE IN MAP STATE (NAME-PLAYLIST)', state)
  return {
    user: state.user,
    genres: state.Genres
  }
}

const mapDispatch = dispatch => {
  return {
    addToPlaylist: song => dispatch(addSongToPlaylist(song))
  }
}

export const SongCard = props => {
  const {song} = props

  return (
    <Card key={song.id} style={{width: '100%'}}>
      <Image src={`${song.album.images[0].url}`} />
      <Card.Content>
        <Card.Header>{song.name}</Card.Header>
        <Card.Meta>
          <span className="date">By {song.artists[0].name}</span>
          {song.preview_url === null ? (
            <p>Sorry, preview unavailable for this song.</p>
          ) : (
            <ReactPlayer
              url={`${song.preview_url}`}
              playing={true}
              controls={true}
              width="90%"
              height="75px"
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '90%',
                height: '5%'
              }}
            />
          )}
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default withRouter(connect(mapState, mapDispatch)(SongCard))
