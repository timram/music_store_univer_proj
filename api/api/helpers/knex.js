const config = require('../../config');

const knex = require('knex')({
  client: 'pg',
  debug: false,
  pool: {
    backoff: {
      min: 10,
      max: 10000
    }
  },
  connection: config.dbConnection
}); 

module.exports = knex;