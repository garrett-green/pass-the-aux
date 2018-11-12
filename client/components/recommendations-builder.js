import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import recommendations, {fetchRecommendations} from '../store/recommendations'
import {fetchGenres} from '../store/genres'
import {Grid, Segment, Dimmer, Loader, Button} from 'semantic-ui-react'

const mapState = state => {
  console.log('STATE IN MAP STATE (NAME-PLAYLIST)', state)
  return {
    user: state.user,
    genres: state.Genres,
    recommendations: state.Recommendations,
    playlist: state.newPlaylist
  }
}

const mapDispatch = dispatch => {
  return {
    getGenres: () => dispatch(fetchGenres()),
    getRecommendations: user => dispatch(fetchRecommendations(user))
  }
}

export class RecommendationsBuilder extends Component {
  constructor() {
    super()
    this.state = {
      genreOptions: [],
      genresSelected: '',
      genreCount: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getGenres()
    const genreOptions = this.props.genres
    this.setState({genreOptions})
  }

  componentDidUpdate(prevProps) {
    if (this.props.recommendations.length > prevProps.recommendations.length) {
      this.props.history.push('/testing-builder')
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const user = {...this.props.user}
    const genres = this.state.genresSelected
    console.log('genres:', genres)
    user.genrePicks = genres
    console.log('user in handlesubmit', user)
    this.props
      .getRecommendations(user)
      .then(recommendationedTracks => {
        console.log('recommendationedTracks', recommendationedTracks)
        return recommendationedTracks
      })
      .then(dopeSongs => {
        console.log('dopeSongs', dopeSongs)
        this.props.history.push('/build-playlist')
      })
  }
  render() {
    if (this.state.genreOptions !== undefined) {
      const genreChoices = this.state.genreOptions
      return (
        <div>
          <h2>Pick A Genre / Mood For Your New Playlist</h2>
          <Grid
            centered
            relaxed
            columns={6}
            style={{
              display: 'flex',
              margin: '10px',
              padding: '10px',
              justifyContent: 'center'
            }}
          >
            {this.state.genreOptions.length > 1 && this.state.genreCount < 1 ? (
              genreChoices.map(genre => {
                return (
                  <Grid.Column
                    style={{
                      display: 'flex',
                      margin: '10px',
                      padding: '10px',
                      justifyContent: 'center'
                    }}
                    key={genre.id}
                  >
                    <Button
                      color="green"
                      value={genre.name}
                      onClick={evt =>
                        this.setState({
                          genresSelected: evt.target.value,
                          genreCount: 1
                        })
                      }
                    >
                      {genre.name.toUpperCase()}
                    </Button>
                  </Grid.Column>
                )
              })
            ) : (
              <div />
            )}
          </Grid>

          <Button
            size="huge"
            style={{display: 'flex', margin: '10px', justifyContent: 'center'}}
            primary
            onClick={evt => this.handleSubmit(evt)}
          >
            GET DOPE SONGS
          </Button>
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

export default withRouter(
  connect(mapState, mapDispatch)(RecommendationsBuilder)
)
