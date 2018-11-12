import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'

const mapState = state => {
  console.log('STATE IN MAP STATE (FINAL)', state)
  return {
    recommendations: state.Recommendations,
    playlist: state.newPlaylist,
    songsForPlaylist: state.SongsForPlaylist,
    user: state.user
  }
}

export class FinalPlaylist extends Component {
  render() {
    const {user, playlist} = this.props

    return (
      <div>
        <Segment
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <h2>{playlist.name}</h2>
          <iframe
            src={`https://open.spotify.com/embed/user/${
              user.spotifyId
            }/playlist/${playlist.id}`}
            width="90%"
            height="580"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        </Segment>
      </div>
    )
  }
}
export default withRouter(connect(mapState)(FinalPlaylist))
