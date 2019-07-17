'use strict'

const db = require('../server/db')
const {User, Genre} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

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
  ])

  console.log(`seeded ${genres.length} genres!`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
