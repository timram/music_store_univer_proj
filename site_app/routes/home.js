var express = require('express');
var router = express.Router();
const homeController = require('../controllers/home');
const { asyncWrapper } = require('../helpers/utils');

/* GET home page. */
router.get('/', asyncWrapper(homeController.viewHome));

module.exports = {
  basePath: '/',
  router
}; 
