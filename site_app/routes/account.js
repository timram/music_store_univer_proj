const express = require('express');
const router = new express.Router();
const AccountController = require('../controllers/account');
const { asyncWrapper } = require('../helpers/utils');

router.get('/', asyncWrapper(AccountController.viewAccount));

router.post('/', asyncWrapper(AccountController.updateAccount));

module.exports = {
  basePath: '/account',
  router
};