const knex = require('./knex');
const { getOffset } = require('./utils');

const getAccount = async selector => {
  const [account] = await knex('account')
    .select('id', 'fname', 'lname', 'email', 'role')
    .where(selector);
  
  return account;
};

const getTotalRowsCount = knexQuery => knexQuery
  .clone()
  .count('* as total');

const applyRestrictionsToQuery = ({ limit, offset }) =>
  knexQuery => knexQuery
    .clone()
    .offset(getOffset({ offset, limit }))
    .limit(limit);

const applyOrderToQuery = (field, direction) => query => query
  .clone()
  .orderBy(field, direction);

const applySelectionToQuery = selection => query => query
  .clone()
  .select(...selection);

module.exports = {
  getAccount,
  getTotalRowsCount,
  applyRestrictionsToQuery,
  applyOrderToQuery,
  applySelectionToQuery
};