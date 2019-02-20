const knex = require('../helpers/knex');
const { throwError } = require('../helpers/error-handler');
const jwt = require('../helpers/jwt');
const { getAccount } = require('../helpers/common-queries');

const Service = {
  login: async ({ login, password }) => {
    const account = await getAccount({
      email: login,
      password
    });
    
    if (!account) {
      return throwError({
        status: 401,
        message: 'There is no account with such login and password'
      });
    }

    const token = jwt.generate({ accountID: account.id });
    return {
      ...account,
      token
    }
  }
};

module.exports = Service;
