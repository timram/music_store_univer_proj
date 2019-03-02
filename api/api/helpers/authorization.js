const jwt = require('./jwt');
const { getAccount } = require('./common-queries');

const denied = callback => {
  const error = new Error();
  error.message = 'Access denied';
  return callback(error);
};

const checkAccountAccess = (scope, account) =>
  !scope || scope.includes(account.role);

module.exports = {
  tokenAuth: async (req, def, token, callback) => {
    try {
      if (!token) return denied(callback);
      const { accountID } = jwt.verify(token);

      const account = await getAccount({ id: accountID });

      if (!account) return denied(callback);

      if (!checkAccountAccess(req.swagger.operation['x-scope'], account)) {
        return denied(callback);
      }
      
      req.account = account;

      return callback(null);
    } catch (err) {
      console.log(err);
      return denied(callback);
    } 
  }
};