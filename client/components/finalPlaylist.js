import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Segment} from 'semantic-ui-react';

const mapState = ({recommendations, playlist, songsForPlaylist, user}) => {
  return {
    recommendations,
    playlist,
    songsForPlaylist,
    user
  };
};

export const FinalPlaylist = props => {
  const {user, playlist} = props;

  return (
    <div>
      <Segment
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <div>
          <h2
            style={{
              justifyContent: 'center',
              paddingTop: '2%',
              paddingBottom: '2%',
              textAlign: 'center'
            }}
          >
            {playlist.name}
          </h2>
        </div>
        <iframe
          src={`https://open.spotify.com/embed/user/${
            user.spotifyId
          }/playlist/${playlist.id}`}
          width="90%"
          height="580"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      </Segment>
    </div>
  );
};

export default withRouter(connect(mapState)(FinalPlaylist));
