const ProxyController = require('../helpers/proxy-controller');

const asyncFunc = () => new Promise((resolve, reject) =>
  setTimeout(() => resolve('hello'), 1000)
);

const Controller = {
  hello: async (req, res) => {
    await asyncFunc(); 
    const error = new Error('some error');
    error.statusCode = 400;
    throw error;
  },
  helloPost: (req, res) => new Promise((resolve, reject) => {
    setTimeout(() => {
      return res.json({ message: 'ZAEBIs', key: 10 })
      // const error = new Error('some error');
      // error.statusCode = 400;
      // return reject(error);
    }, 100)
  })
};

module.exports = ProxyController(Controller);
