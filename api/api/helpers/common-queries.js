const knex = require('./knex');

const getAccount = async selector => {
  const [account] = await knex('account')
    .select('id', 'fname', 'lname', 'email', 'role')
    .where(selector);
  
  return account;
};

module.exports = {
  getAccount
};