import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import recommendations, {fetchRecommendations} from '../store/recommendations'
import { fetchGenres } from '../store/genres'
import { Button } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'

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
    const genreOptions =this.props.genres
    this.setState({genreOptions})
  }

  componentDidUpdate(prevProps)  {
    if(this.props.recommendations.length > prevProps.recommendations.length)  {
      this.props.history.push('/testing-builder')
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const user = {...this.props.user}
    const genres = this.state.genresSelected
    console.log('genres:', genres)
    user.genrePicks = genres;
    console.log('user in handlesubmit', user)
    this.props.getRecommendations(user)
    .then(recommendationedTracks => {
      console.log('recommendationedTracks', recommendationedTracks)
      return recommendationedTracks;
    })
    .then((dopeSongs) =>  {
      console.log('dopeSongs', dopeSongs)
      this.props.history.push('/build-playlist')
    })
  }
  render() {

    console.log('PROPS IN BUILDER:', this.props)
    console.log('STATE OF BUILDER:', this.state)

    // const genrePicks = selection => {
    //   let currentPicks = this.state.genresSelected;
    //   let updatedPicks = `${currentPicks} ${selection}`
    //   if(updatedPicks[0] === ' ') {
    //     updatedPicks = updatedPicks.slice(1)
    //   }
    //   let currentCount = this.state.genreCount;
    //   let updatedCount = currentCount + 1;
    //   this.setState({genresSelected: updatedPicks, genreCount: updatedCount})
    // }

    if(this.state.genreOptions !== undefined) {
      const genreChoices = this.state.genreOptions
      return (
        <div margin="10px" padding="10px">
        <h2>Pick A Genre / Mood For Your New Playlist</h2>
        <Grid centered relaxed columns={6}>
        {
          this.state.genreOptions.length > 1 && this.state.genreCount < 1 ? genreChoices.map(genre =>  {
            return (
              // <Grid.Column key={genre.id}>
              // <Button color='green' value={genre.name} onClick={(evt) => genrePicks(evt.target.value)}>{genre.name}</Button>
              // </Grid.Column>
              <Grid.Column key={genre.id}>
              <Button color='green' value={genre.name} onClick={(evt) => this.setState({genresSelected: evt.target.value, genreCount: 1})}>{genre.name}</Button>
              </Grid.Column>
              )
          }) : <div />
        }
        </Grid>
        {/* {
          this.state.genresSelected.length < 5 ?
            this.state.genreOptions.map( genre =>  {
              return (
              <button key={genre.id} type="button" value={genre.name} onClick={evt => this.setState((state) =>  {
                return {genresSelected: [...state.genresSelected, evt.target.value]}
              })}>{genre.name}</button>
              )
            })
           : <div />
        } */}

        <Button primary onClick={evt => this.handleSubmit(evt)}>GET DOPE SONGS</Button>
        {/* <button type="submit" onClick={evt => this.handleSubmit(evt)} >GET EM</button> */}
      </div>
      )
    }

    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(RecommendationsBuilder))
