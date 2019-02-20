const ProxyController = require('../helpers/proxy-controller');
const AccountService = require('../services/account');

const Controller = {
  login: async (req, res) => {
    const accountCreds = req.swagger.params.Credentials.value;
    
    const account = await AccountService.login(accountCreds);

    return res.json(account);
  },

  checkAccount: (req, res) => res.json(req.account)
};

module.exports = ProxyController(Controller);
