'use strict';

const db = require('../server/db');
const {User, Genre, Playlist, Track} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const genres = await Promise.all([
    Genre.create({name: 'alternative'}),
    Genre.create({name: 'bluegrass'}),
    Genre.create({name: 'blues'}),
    Genre.create({name: 'classical'}),
    Genre.create({name: 'country'}),
    Genre.create({name: 'disco'}),
    Genre.create({name: 'disney'}),
    Genre.create({name: 'edm'}),
    Genre.create({name: 'folk'}),
    Genre.create({name: 'funk'}),
    Genre.create({name: 'heavy-metal'}),
    Genre.create({name: 'hip-hop'}),
    Genre.create({name: 'holidays'}),
    Genre.create({name: 'jazz'}),
    Genre.create({name: 'pop'}),
    Genre.create({name: 'punk'}),
    Genre.create({name: 'reggae'}),
    Genre.create({name: 'rock'}),
    Genre.create({name: 'show-tunes'}),
    Genre.create({name: 'soul'}),
    Genre.create({name: 'soundtracks'}),
    Genre.create({name: 'study'}),
    Genre.create({name: 'summer'}),
    Genre.create({name: 'work-out'}),
    Genre.create({name: 'sad'}),
    Genre.create({name: 'sleep'}),
    Genre.create({name: 'chill'}),
    Genre.create({name: 'happy'}),
    Genre.create({name: 'party'}),
    Genre.create({name: 'rainy-day'})
  ]);

  console.log(`seeded ${genres.length} genres!`);

  const user = await User.create({
    id: 1,
    email: 'garrett.wile.green@gmail.com',
    name: 'Garrett-Green',
    spotifyId: '125381746',
    isAdmin: false
  });

  console.log(`seeded 1 user: ${user.name}!`);

  const playlists = await Promise.all([
    Playlist.create({
      id: 1,
      spotifyURI: 'abc123',
      name: 'seed test 1',
      url: 'playlist.test/1',
      userId: 1
    }),
    Playlist.create({
      id: 2,
      spotifyURI: 'def456',
      name: 'seed test 2',
      url: 'playlist.test/2',
      userId: 1
    })
  ]);

  console.log(`seeded ${playlists.length} playlists!`);

  const tracks = await Promise.all([
    Track.create({
      id: 1,
      spotifyURI: 'qwe123',
      name: 'dope track 1',
      artist: 'dope artist 1',
      artistSpotifyURI: 'a1',
      popularity: 69,
      url: 'track.test/1',
      playlistId: 1,
      genreId: 2
    }),
    Track.create({
      id: 2,
      spotifyURI: 'asd123',
      name: 'dope track 2',
      artist: 'dope artist 2',
      artistSpotifyURI: 'b2',
      popularity: 69,
      url: 'track.test/2',
      playlistId: 2,
      genreId: 1
    }),
    Track.create({
      id: 3,
      spotifyURI: 'zxc123',
      name: 'dope track 3',
      artist: 'dope artist 3',
      artistSpotifyURI: 'c3',
      popularity: 69,
      url: 'track.test/3',
      playlistId: 2,
      genreId: 1
    })
  ]);

  console.log(`seeded ${tracks.length} tracks!`);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
