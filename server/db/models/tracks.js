const Sequelize = require('sequelize');
const db = require('../db');

const Track = db.define('track', {
  spotifyURI: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: Sequelize.STRING,
  artist: Sequelize.STRING,
  artistSpotifyURI: Sequelize.STRING,
  popularity: Sequelize.INTEGER,
  url: Sequelize.STRING
});

module.exports = Track;
