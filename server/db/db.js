const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName = pkg.name;

const databaseURI =
  process.env.NODE_ENV === 'development'
    ? `postgres://localhost:5432/${databaseName}`
    : process.env.DATABASE_URL;

const dbOptions =
  process.env.NODE_ENV === 'development' ? {logging: true} : {logging: false};

const db = new Sequelize(databaseURI, dbOptions);

module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
