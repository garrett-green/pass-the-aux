import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import recommendations, {fetchRecommendations} from '../store/recommendations'
import { fetchGenres } from '../store/genres'

const mapState = state => {
  console.log('STATE IN MAP STATE (NAME-PLAYLIST)', state)
  return {
    user: state.user,
    genres: state.Genres
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

  handleSubmit(evt) {
    evt.preventDefault();
    const user = {...this.props.user}
    const genres = this.state.genresSelected.slice(1);
    console.log('genres:', genres)
    user.genrePicks = genres;
    console.log('user in handlesubmit', user)
    this.props.getRecommendations(user)
    .then(recommendationedTracks => {
      console.log('recommendationedTracks', recommendationedTracks)
    })
  }
  render() {

    console.log('PROPS IN BUILDER:', this.props)
    console.log('STATE OF BUILDER:', this.state)

    const genrePicks = selection => {
      let currentPicks = this.state.genresSelected;
      let updatedPicks = `${currentPicks} ${selection}`
      let currentCount = this.state.genreCount;
      let updatedCount = currentCount + 1;
      this.setState({genresSelected: updatedPicks, genreCount: updatedCount})
    }

    if(this.state.genreOptions !== undefined) {
      const genreChoices = this.state.genreOptions
      return (
        <div>
        <h2>Choose Up To 5 Genres / Moods For Your New Playlist</h2>
        {
          this.state.genreOptions.length > 1 && this.state.genreCount < 5 ? genreChoices.map(genre =>  {
            return (
              <button key={genre.id} type="button" value={genre.name} onClick={(evt) => genrePicks(evt.target.value)}>{genre.name}</button>
              )
          }) : <div />
        }
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


        <button type="submit" onClick={evt => this.handleSubmit(evt)} >GET EM</button>
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
