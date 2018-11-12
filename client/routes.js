import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  TopArtists,
  RecommendationsBuilder,
  NamePlaylist,
  SongCard,
  PlaylistBuilder,
  FinalPlaylist
} from './components'
import {me} from './store'
import {fetchGenres} from './store/genres'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('comp did mount')
    this.props.loadInitialData()
    fetchGenres()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" {...this.props} component={Login} />
        <Route path="/signup" {...this.props} component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" {...this.props} component={TopArtists} />
            <Route
              path="/name-playlist"
              {...this.props}
              component={NamePlaylist}
            />
            <Route
              path="/pick-genre"
              {...this.props}
              component={RecommendationsBuilder}
            />
            <Route
              exact
              path="/build-playlist"
              {...this.props}
              component={PlaylistBuilder}
            />
            <Route
              exact
              path="/your-new-playlist"
              {...this.props}
              component={FinalPlaylist}
            />
            <Route path="/home" {...this.props} component={TopArtists} />
            <Route path="/" {...this.props} component={TopArtists} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
