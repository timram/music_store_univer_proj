const ProxyController = require('../helpers/proxy-controller');
const AccountService = require('../services/account');

const Controller = {
  login: async (req, res) => {
    const accountCreds = req.swagger.params.Credentials.value;
    
    const token = await AccountService.login(accountCreds);

    return res.json({ token });
  }
};

module.exports = ProxyController(Controller);
