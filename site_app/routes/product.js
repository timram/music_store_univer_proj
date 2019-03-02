const express = require('express');
const router = new express.Router();
const ProductController = require('../controllers/product');
const { asyncWrapper } = require('../helpers/utils');

router.get('/:prodID', asyncWrapper(ProductController.viewProduct));
router.post('/:prodID', asyncWrapper(ProductController.addToCart));

module.exports = {
  router,
  basePath: '/products'
};