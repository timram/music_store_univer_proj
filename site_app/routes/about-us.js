const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => res.render('about-us', {
  title: 'О компании'
}));

module.exports = {
  router,
  basePath: '/about-us'
}