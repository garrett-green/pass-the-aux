import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchArtists} from '../store/top-artists'
import {
  Grid,
  Button,
  Segment,
  Dimmer,
  Loader,
  Card,
  Image
} from 'semantic-ui-react'

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists
  }
}

const mapDispatch = dispatch => {
  return {
    getTopArtists: user => dispatch(fetchArtists(user))
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
    this.setState({artists})
  }

  render() {
    if (this.state.artists !== undefined) {
      return (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              color="green"
              onClick={() => this.props.history.push('/name-playlist')}
              size="huge"
            >
              LET'S MAKE A NEW PLAYLIST
            </Button>
          </div>

          <h2
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            According to Spotify, these are some of your favorite artists...
          </h2>

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
            {this.state.artists.map(artist => {
              return (
                <Card
                  key={artist.id}
                  style={{
                    display: 'flex',
                    margin: '10px',
                    padding: '10px',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    style={{
                      height: '250px'
                    }}
                    src={`${artist.images[1].url}`}
                  />
                  <Card.Content>
                    <Card.Header
                      as="a"
                      href={`${artist.external_urls.spotify}`}
                      target="_blank"
                    >
                      {artist.name}
                    </Card.Header>
                  </Card.Content>
                </Card>
              )
            })}
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

export default withRouter(connect(mapState, mapDispatch)(TopArtists))
