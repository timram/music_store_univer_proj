const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  generate: ({ accountID }) => jwt.sign({ accountID }, config.jwt.secret),
  verify: (token) => jwt.verify(token, config.jwt.secret)
};
