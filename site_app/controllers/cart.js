const { deleteCartItem, getTotalPrice } = require('../helpers/cart');
const { createOrder } = require('../helpers/common-requests');

const Controller = {
  viewCart: async (req, res) => {
    return res.render('cart', {
      title: 'Корзина',
      items: req.session.cart && req.session.cart.items,
      hasAccount: !!req.session.account,
      totalPrice: getTotalPrice(req.session.cart)
    });
  },

  deleteItem: async (req, res) => {
    const prodID = parseInt(req.params.prodID, 10);
    
    req.session.cart = deleteCartItem(req.session.cart, prodID);

    return res.redirect('/cart');
  },

  createOrder: async (req, res) => {
    if (!req.session.account) {
      return res.redirect('../login');
    }

    if (!req.session.cart) {
      return res.redirect('../');
    }

    await createOrder(req.session.account, req.session.cart);

    req.session.cart = null;

    return res.redirect('../account');
  }
}

module.exports = Controller;
