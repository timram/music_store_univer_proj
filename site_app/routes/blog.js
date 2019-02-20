const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('blog/index', { title: 'super blog' });
}); 

module.exports = {
  basePath: '/blog',
  router
}; 