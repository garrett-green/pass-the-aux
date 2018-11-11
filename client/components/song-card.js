import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
// import { Icon } from 'semantic-ui-react'
import { addSongToPlaylist } from '../store/songsForPlaylist'

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

export const SongCard = (props) => {

  const {song} = props;

  // const song = {
  //   album: {
  //     images: [
  //       {
  //         url: 'https://i.scdn.co/image/39d8a9da23587f0273faad72797a27b77f5c8e07'
  //       }
  //     ]
  //   },
  //   artists: [{
  //     name: 'Lipps Inc.'
  //   }],
  //   name: 'Funky Town',
  //   preview_url: 'https://p.scdn.co/mp3-preview/7378227189ebb06cc3bf9fdc99bfc6490843de9d?cid=2d340678d510452f8a83712157b68706',
  //   uri: 'spotify:track:7723JnKU2R15Iv4T7OJrly',
  //   id: '7723JnKU2R15Iv4T7OJrly'
  // }

  // const addToPlaylist = song => {
  //   props.addToPlaylist(song)
  //   .then((returnedSong) => {
  //     if(returnedSong.addedToPlaylist)  {

  //     }
  //   })
  // }

  return (
    <Card key={song.id}>
    <Image src={`${song.album.images[0].url}`} />
    <Card.Content>
      <Card.Header>{song.name}</Card.Header>
      <Card.Meta>
        <span className='date'>By {song.artists[0].name}</span>
      {/* </Card.Meta> */}
      {
      song.preview_url === null ? <p>Sorry, preview unavailable for this song.</p> : (
        <ReactPlayer url={`${song.preview_url}`} playing={true} controls={true} width="90%" height="5%" />
      )
    }
    {/* <Icon onClick={() => {}} name="thumbs up" />
    <Icon onClick={() => {}} name="thumbs down" /> */}
    </Card.Meta>
    </Card.Content>
    {/* <Card.Content extra> */}
    {/* {
      song.preview_url === null ? <p>Sorry, preview unavailable for this song.</p> : (
        <ReactPlayer url={`${song.preview_url}`} playing={true} controls={true} width="90%" />
      )
    } */}
      {/* <a>
        <Icon name='user' />
        22 Friends
      </a> */}
    {/* </Card.Content> */}
  </Card>
  )
}

export default withRouter(connect(mapState, mapDispatch)(SongCard))
