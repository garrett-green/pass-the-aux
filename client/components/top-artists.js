import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchArtists} from '../store/top-artists'
import {fetchRecommendations} from '../store/recommendations'
import {createNewPlaylist} from '../store/playlist'
import { NamePlaylist } from './name-playlist';

const mapState = state => {
  console.log('STATE IN MAP STATE (TOP-ARTISTS)', state)
  return {
    user: state.user
    // TopArtists: state.TopArtists.TopArtists
  }
}

const mapDispatch = dispatch => {
  return {
    getTopArtists: user => dispatch(fetchArtists(user)),
    getRecommendations: user => dispatch(fetchRecommendations(user)),
    makePlaylist: user => dispatch(createNewPlaylist(user))
  }
}

export class TopArtists extends Component {
  constructor() {
    super()
    this.state = {
      artists: []
    }
  }

  async componentDidMount() {
    const user = this.props.user
    const artists = await this.props.getTopArtists(this.props.user)
    // const recommendations = await this.props.getRecommendations(this.props.user)
    // console.log('RECOMMENDATIONS:', recommendations)
    this.setState({artists})
  }

  render() {
    console.log('PROPS IN TopArtists Component:', this.props)

    console.log('this.state.artists =', this.state.artists)

    if (this.state.artists !== undefined) {
      return (
        <div>
          <div>
            <NamePlaylist {...this.props} />
          </div>
          <h3>Some of your favorite artists:</h3>
          <ul>
            {this.state.artists.map((artist, idx) => {
              return <li key={idx}>{artist.name}</li>
            })}
          </ul>
        {/* <h3>We have recommendations!</h3>
        <ul>
          {this.state.artists.map((recommendation, idx) => {
            return <li key={idx}>{recommendation.name}</li>
          })}
        </ul> */}
      </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(TopArtists))
