import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {createNewPlaylist} from '../store/playlist';
import {connect} from 'react-redux';
import {Button, Segment, Grid} from 'semantic-ui-react';

const mapState = ({user, playlist}) => {
  return {
    user,
    playlist
  };
};

const mapDispatch = dispatch => {
  return {
    makePlaylist: (user, title) => dispatch(createNewPlaylist(user, title))
  };
};

export class NamePlaylist extends Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const user = {...this.props.user, playlistName: this.state.title};

    this.props.makePlaylist(user).then(playlist => {
      if (!!playlist) {
        console.log('playlist made! name:', playlist.name);
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      !!this.props.playlist.id &&
      this.props.playlist.id !== prevProps.playlist.id
    ) {
      this.props.history.push('/pick-genre');
    }
  }

  render() {
    return (
      <div
        style={{
          padding: '10px',
          margin: '10px',
          width: '100%'
        }}
      >
        <Grid centered columns={2} style={{width: '100%'}}>
          <Segment style={{height: '10%'}}>
            <form onSubmit={this.handleSubmit}>
              <Grid.Column>
                <input
                  type="text"
                  required
                  id="playlist-title"
                  label="Playlist Name"
                  value={this.state.title}
                  onChange={evt => this.setState({title: evt.target.value})}
                />
              </Grid.Column>

              <Grid.Column>
                <Button color="green" type="submit">
                  Create Playlist
                </Button>
              </Grid.Column>
            </form>
          </Segment>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(mapState, mapDispatch)(NamePlaylist));
