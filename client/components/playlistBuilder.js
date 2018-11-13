import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SongCard} from './index'
import {
  Transition,
  Icon,
  Button,
  Grid,
  Segment,
  Divider,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import {addSongToPlaylist} from '../store/songsForPlaylist'
import {buildPlaylist} from '../store/playlist'
import FinalPlaylist from './finalPlaylist'

const mapState = state => {
  return {
    recommendations: state.Recommendations,
    playlist: state.newPlaylist,
    songsForPlaylist: state.SongsForPlaylist,
    user: state.user,
    submitted: false
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
      currentSong: 0,
      submitted: false
    }
  }

  addToPlaylist = song => {
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

  buildFinalPlaylist = async () => {
    this.setState({submitted: true})
    const userData = {
      user: this.props.user,
      playlist: this.props.playlist,
      songs: this.props.songsForPlaylist
    }
    const dopePlaylist = await this.props
      .createFinalPlaylist(userData)
      .then(dopeNewPlaylist => {
        console.log('dopeNewPlaylist:', dopeNewPlaylist)
      })
    console.log('dopePlaylist', dopePlaylist)
  }

  componentDidUpdate(prevProps) {
    if (this.state.submitted !== prevProps.submitted) {
      this.props.history.push('/your-new-playlist')
    }
  }

  render() {

    const {visible, currentSong, submitted} = this.state

    if (this.props.recommendations && this.props.recommendations.length > 1) {
      return (
        <div>
          <Grid centered columns={2} style={{
              padding: '5px',
              margin: '5px'
            }} >
            <Grid.Column>
              <Transition.Group animation="fly up" duration="400">
                {visible && (
                  <SongCard song={this.props.recommendations[currentSong]} />
                )}
              </Transition.Group>
            </Grid.Column>
          </Grid>

          <Grid centered columns="equal" style={{
              padding: '5px',
              margin: '5px'
            }} >
            <Segment style={{
              padding: '10px',
              margin: '10px'
            }}>
              <Grid.Column style={{float: 'right'}}>
              <h3>ADD</h3>
                <Icon
                  size="huge"
                  link={true}
                  onClick={() =>
                    this.addToPlaylist(this.props.recommendations[currentSong])
                  }
                  name="thumbs up"
                />
              </Grid.Column>
              <Grid.Column style={{float: 'left'}}>
              <h3>PASS</h3>
                <Icon
                  size="huge"
                  link={true}
                  onClick={() => this.nextSong()}
                  name="thumbs down"
                />
              </Grid.Column>
            </Segment>
          </Grid>
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
              margin: '10px'
            }}
          >
            <h2 style={{
              float: 'left',
              padding: '5px',
              margin: '5px'
            }}>Ready To Rock?</h2>
            <Button
            style={{
              float: 'right',
              padding: '5px',
              margin: '5px'
            }}
              color="green"
              onClick={this.buildFinalPlaylist}
              size="massive"
            >
              PUBLISH PLAYLIST
            </Button>
          </div>
        </div>
      )
    } else if (submitted) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column>
              <FinalPlaylist props={this.props} />
            </Grid.Column>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <Segment>
            <Dimmer active>
              <Loader size="large">Loading...</Loader>
            </Dimmer>
          </Segment>
        </div>
      )
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(PlaylistBuilder))
