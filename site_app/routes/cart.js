const express = require('express');
const router = new express.Router();
const CartController = require('../controllers/cart');
const { asyncWrapper } = require('../helpers/utils');

router.get('/', asyncWrapper(CartController.viewCart));
router.get('/delete/:prodID', asyncWrapper(CartController.deleteItem));
router.get('/create-order', asyncWrapper(CartController.createOrder));

module.exports = {
  router,
  basePath: '/cart'
};
