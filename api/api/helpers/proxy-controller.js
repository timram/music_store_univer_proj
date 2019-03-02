const { genericErrorHandler, throwError } = require('./error-handler');

const checkAccountID = req => {
  const accID = req.swagger.params.accID && req.swagger.params.accID.value;
  if (accID && req.account && req.account.id !== accID && req.account.role !== 'admin') {
    throwError({ status: 403, message: 'Access denied' });
  }
}

module.exports = controller => new Proxy(controller, {
  get(target, propName) {
    const prop = target[propName];
    if (typeof prop !== 'function') return prop;

    return async (req, res) => {
      try {
        checkAccountID(req);
        await prop(req, res);
      } catch (err) {
        return genericErrorHandler(res, err);
      }
    }
  }
});