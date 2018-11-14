import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import recommendations, {fetchRecommendations} from '../store/recommendations'
import {fetchGenres} from '../store/genres'
import {Grid, Segment, Dimmer, Loader, Button} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'

const mapState = state => {
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
    user.genrePicks = genres
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
    let style = {}

    if (isMobile) {
      style.display = 'flex'
      style.flexDirection = 'row'
      style.textAlign = 'center'
    } else {
    }

    if (this.state.genreOptions !== undefined) {
      const genreChoices = this.state.genreOptions
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: '5px',
            margin: '5px',
            width: '100%'
          }}
        >
          <h2
            style={{
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            What kind of songs do you want to add to your playlist?
          </h2>
          <h3
            style={{
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            Pick a genre / mood:
          </h3>
          <Grid
            centered
            stackable
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
              <div>
                <p>
                  At this time, you only get to choose one genre for your
                  playlist.
                </p>
                <Button
                  color="yellow"
                  size="small"
                  value=""
                  onClick={evt =>
                    this.setState({
                      genresSelected: evt.target.value,
                      genreCount: 0
                    })
                  }
                >
                  PICK A DIFFERENT GENRE
                </Button>
              </div>
            )}
          </Grid>

          <Button
            size="huge"
            style={{display: 'flex', margin: '10px', justifyContent: 'center'}}
            primary
            onClick={evt => this.handleSubmit(evt)}
          >
            SHOW ME GREAT {this.state.genresSelected.toUpperCase()} SONGS
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
