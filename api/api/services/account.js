const knex = require('../helpers/knex');
const { throwError } = require('../helpers/error-handler');
const jwt = require('../helpers/jwt');

const Service = {
  login: async ({ login, password }) => {
    const [account] = await knex('account')
      .select('id')
      .where({
        email: login,
        password
      });
    
    if (!account) {
      return throwError({
        status: 401,
        message: 'There is no account with such login and password'
      });
    }

    return jwt.generate({ accountID: account.id });
  }
};

module.exports = Service;
