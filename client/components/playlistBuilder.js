import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SongCard} from './index'
import {Transition, Icon, Button} from 'semantic-ui-react'
import {addSongToPlaylist} from '../store/songsForPlaylist'
import {buildPlaylist} from '../store/playlist'

const mapState = state => {
  console.log('STATE IN MAP STATE (NAME-PLAYLIST)', state)
  return {
    recommendations: state.Recommendations,
    playlist: state.newPlaylist,
    songsForPlaylist: state.SongsForPlaylist,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addToPlaylist: song => dispatch(addSongToPlaylist(song)),
    createFinalPlaylist: userData => dispatch(buildPlaylist(userData))
  }
}

export class PlaylistBuilder extends Component {
  constructor() {
    super()
    this.state = {
      visible: true,
      currentSong: 0
    }
  }

  addToPlaylist = song => {
    console.log('SONG IN ADD TO PLAYLIST:', song)
    this.props.addToPlaylist(song).then(updatedSong => {
      if (updatedSong.addedToPlaylist) {
        let currentSongCounter = this.state.currentSong
        this.setState({currentSong: currentSongCounter + 1})
      }
    })
  }

  nextSong = () => {
    let currentSongCounter = this.state.currentSong
    this.setState({currentSong: currentSongCounter + 1})
  }

  buildFinalPlaylist = async () =>  {
    const userData = {
      user: this.props.user,
      playlist:  this.props.playlist,
      songs: this.props.songsForPlaylist
    }
    const dopePlaylist = await this.props.createFinalPlaylist(userData)
    console.log('dopePlaylist', dopePlaylist)

  }

  render() {
    console.log('PROPS IN BUILDER:', this.props)

    const {visible, currentSong} = this.state

    if(this.props.recommendations && this.props.recommendations.length > 1) {
      return (
        <div>
        <div>
          <Transition.Group animation="fly up" duration="400">
            {visible && (
              <SongCard song={this.props.recommendations[currentSong]} />
            )}
          </Transition.Group>
          {/* <Button animated onClick={() =>
              this.addToPlaylist(this.props.recommendations[currentSong])
            }>
            <Button.Content visible>BOP: ADD IT</Button.Content>
            <Button.Content hidden>
              <Icon name="thumbs up" />
            </Button.Content>
          </Button>
          <Button animated onClick={() => this.nextSong()}>
            <Button.Content visible>FLOP: PASS</Button.Content>
            <Button.Content hidden>
              <Icon name="thumbs down" />
            </Button.Content>
          </Button> */}

          <Icon
            link={true}
            onClick={() =>
              this.addToPlaylist(this.props.recommendations[currentSong])
            }
            name="thumbs up"
          />
          <Icon link={true} onClick={() => this.nextSong()} name="thumbs down" />
        </div>
        <div>
          <h2>Finalize Your Playlist:</h2>
          <Button primary onClick={this.buildFinalPlaylist} size='massive'>PASS THE AUX</Button>
        </div>
        </div>
      )
    } else  {
      return (
      <div>
        Loading...
      </div>
      )
    }

    // return (
    //   <div>
    //   <div>
    //     <Transition.Group animation="fly up" duration="400">
    //       {visible && (
    //         <SongCard song={this.props.recommendations[currentSong]} />
    //       )}
    //     </Transition.Group>
    //     <Button animated onClick={() =>
    //         this.addToPlaylist(this.props.recommendations[currentSong])
    //       }>
    //       <Button.Content circular visible>BOP: ADD IT</Button.Content>
    //       <Button.Content hidden>
    //         <Icon name="thumbs up" />
    //       </Button.Content>
    //     </Button>
    //     <Button animated circular onClick={() => this.nextSong()}>
    //       <Button.Content visible>FLOP: PASS</Button.Content>
    //       <Button.Content hidden>
    //         <Icon name="thumbs down" />
    //       </Button.Content>
    //     </Button>
    //     {/* <Icon
    //       link={true}
    //       onClick={() =>
    //         this.addToPlaylist(this.props.recommendations[currentSong])
    //       }
    //       name="thumbs up"
    //     />
    //     <Icon link={true} onClick={() => this.nextSong()} name="thumbs down" /> */}
    //   </div>
    //   <div>
    //     <h2>Finalize Your Playlist:</h2>
    //     <Button as="link" onClick={() => this.buildFinalPlaylist} size='massive'>PASS THE AUX</Button>
    //   </div>
    //   </div>
    // )
  }
}
export default withRouter(connect(mapState, mapDispatch)(PlaylistBuilder))
