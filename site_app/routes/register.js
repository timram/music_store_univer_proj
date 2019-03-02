const express = require('express');
const router = new express.Router();
const AccountController = require('../controllers/account');
const { asyncWrapper } = require('../helpers/utils');

router.get('/', asyncWrapper(AccountController.registerView));

router.post('/', asyncWrapper(AccountController.registerAccount));

module.exports = {  
  router,
  basePath: '/register'
};