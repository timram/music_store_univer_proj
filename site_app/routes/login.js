var express = require('express');
var router = express.Router();
const controller = require('../controllers/account');
const { asyncWrapper } = require('../helpers/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Войти' });
});

router.post('/', asyncWrapper(controller.login));

module.exports = {
  basePath: '/login',
  router
}; 
