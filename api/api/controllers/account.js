const ProxyController = require('../helpers/proxy-controller');
const AccountService = require('../services/account');

const Controller = {
  login: async (req, res) => {
    const accountCreds = req.swagger.params.Credentials.value;
    
    const account = await AccountService.login(accountCreds);

    return res.json(account);
  },

  checkAccount: (req, res) => res.json(req.account),

  getAccount: async (req, res) => {
    const accID = req.swagger.params.accID.value;
    const account = await AccountService.getByID(accID);
    return res.json(account);
  },

  create: async (req, res) => {
    const account = req.swagger.params.Account.value;

    const newAccount = await AccountService.create(account);

    return res.json(newAccount);
  },

  update: async (req, res) => {
    const accID = req.swagger.params.accID.value;
    const account = req.swagger.params.Account.value;

    const updAccount = await AccountService.update(accID, account);

    return res.json(updAccount);
  }
};

module.exports = ProxyController(Controller);
