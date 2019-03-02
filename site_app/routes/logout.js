var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.session.account = null;
  res.redirect('../');
});

module.exports = {
  basePath: '/logout',
  router
}; 
