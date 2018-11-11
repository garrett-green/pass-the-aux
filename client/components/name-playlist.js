import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {createNewPlaylist} from '../store/playlist'
import {connect} from 'react-redux'

const mapState = state => {
  console.log('STATE IN MAP STATE (NAME-PLAYLIST)', state)
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    makePlaylist: (user, title) => dispatch(createNewPlaylist(user, title))
  }
}

export class NamePlaylist extends Component {
  constructor() {
    super()
    this.state = {
      title: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const user = this.props.user;
    user.playlistName = this.state.title;
    console.log('user in handlesubmit', user)
    this.props.makePlaylist(user)
    .then(playlist => {
      if(playlist.owner.id === user.spotifyId)  {
        this.props.history.push('/select-playlist-moods-genres')
      }
    })
  }
  render() {

    console.log('PROPS IN NAME PLAYLIST:', this.props)
    console.log('STATE OF NAME PLAYLIST:', this.state)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
          type="text"
          required
          id="playlist-title"
          label="Playlist Name"
          value={this.state.title}
          onChange={evt => this.setState({title: evt.target.value})}
          />
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(NamePlaylist))
