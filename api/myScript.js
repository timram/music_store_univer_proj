const knex = require('./api/helpers/knex');
const controller = require('./api/controllers/ping');

async function main() {
  const acc = await knex('account')
    .select('id')
    .where({
      id: 1,
      email: 'timur@findify.io'
    });
  console.log(acc);
}

main();