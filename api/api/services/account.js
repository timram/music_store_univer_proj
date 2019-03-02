const knex = require('../helpers/knex');
const jwt = require('../helpers/jwt');
const { getAccount } = require('../helpers/common-queries');
const {
  processDBError,
  dbErrorsDescriptors,
  throwError
} = require('../helpers/error-handler');

const processAccountDBErrors = (err, account) => processDBError(err, {
  [dbErrorsDescriptors.uniqueDuplication.attrName]: {
    fields: ['email'],
    values: [account.email]
  }
});

const Service = {
  login: async ({ login, password, role }) => {
    const account = await getAccount({
      email: login,
      password,
      role: role || 'admin'
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
  },

  getByID: async accID => {
    const account = await getAccount({ id: accID });
    if (!account) {
      return throwError({
        status: 404,
        message: `There is no account with ID: ${accID}`
      })
    }

    return account;
  },

  create: async account => {
    try {
      const [newID] = await knex('account')
        .insert({
          email: account.email,
          fname: account.fname,
          lname: account.lname,
          password: account.password,
          role: 'customer'
        })
        .returning('id');
      return Service.login({ login: account.email, password: account.password, role: 'customer' });
    } catch (err) {
      processAccountDBErrors(err, account);
    }
  },

  update: async (accID, account) => {
    try {
      await knex('account')
        .update({
          email: account.email,
          fname: account.fname,
          lname: account.lname
        })
        .where('id', accID);
      return Service.getByID(accID);
    } catch (err) {
      processAccountDBErrors(err, account);
    }
  }
};

module.exports = Service;
