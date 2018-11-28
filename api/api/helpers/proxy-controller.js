const { genericErrorHandler } = require('./error-handler');

module.exports = controller => new Proxy(controller, {
  get(target, propName) {
    const prop = target[propName];
    if (typeof prop !== 'function') return prop;

    return async (req, res) => {
      try {
        await prop(req, res);
      } catch (err) {
        return genericErrorHandler(res, err);
      }
    }
  }
});