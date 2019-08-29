import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import {
  Login,
  Signup,
  TopArtists,
  RecommendationsBuilder,
  NamePlaylist,
  PlaylistBuilder,
  FinalPlaylist
} from './components';
import {me} from './store';
import {fetchGenres} from './store/genres';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    fetchGenres();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
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

        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
