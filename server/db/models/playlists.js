const Sequelize = require('sequelize');
const db = require('../db');

const Playlist = db.define('playlist', {
  spotifyURI: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING
});

module.exports = Playlist;
