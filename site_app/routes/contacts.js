const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => res.render('contacts', {
  title: 'Контакты'
}))

module.exports = {
  router,
  basePath: '/contacts'
}