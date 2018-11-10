import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchArtists} from '../store/top-artists'
import {fetchRecommendations} from '../store/recommendations'
import {createNewPlaylist} from '../store/playlist'

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
      artists: [],
      recommendations: []
    }
  }

  async componentDidMount() {
    const artists = await this.props.getTopArtists(this.props.user)
    const recommendations = await this.props.getRecommendations(this.props.user)
    console.log('RECOMMENDATIONS:', recommendations)
    // const newPlaylist = await this.props.makePlaylist(this.props.user)
    // console.log('NEW PLAYLIST:', newPlaylist)
    this.setState({artists})
  }

  render() {
    console.log('PROPS IN TopArtists Component:', this.props)

    console.log('this.state.artists =', this.state.artists)

    if (this.state.artists !== undefined) {
      return (
        <div>
          <h3>We have artists!</h3>
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

export default connect(mapState, mapDispatch)(TopArtists)
