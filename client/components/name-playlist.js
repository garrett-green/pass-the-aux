import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {createNewPlaylist} from '../store/playlist'
import {connect} from 'react-redux'

const mapState = state => {
  console.log('STATE IN MAP STATE (NAME-PLAYLIST)', state)
  return {
    user: state.user,
    playlist: state.newPlaylist
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
      console.log('playlist made:', playlist)
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.playlist.id && this.props.playlist.id !== prevProps.playlist.id)  {
      this.props.history.push('/pick-genre')
    }
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
