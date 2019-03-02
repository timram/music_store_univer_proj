const { getProduct } = require('../helpers/common-requests');
const { updateCartItems, getCartItem } = require('../helpers/cart');

const Controller = {
  viewProduct: async (req, res) => {
    const product = await getProduct(req.params.prodID);
    const cartItem = getCartItem(req.session.cart, product.id);
    return res.render('product', {
      title: 'Продукт',
      product: {
        ...product,
        count: product.count - cartItem.quantity
      },
      exceedLimit: cartItem.quantity >= product.count
    });
  },
  addToCart: async (req, res) => {
    const product = await getProduct(req.params.prodID);
    const quantity = parseInt(req.body.quantity, 10);
    const cartItem = getCartItem(req.session.cart, product.id);
    const totalQuantity = quantity + cartItem.quantity;
    if (totalQuantity > product.count) {
      return res.render('product', {
        title: 'Продукт',
        product,
        errors: {
          quantity: 'Количество товара в корзине превышает количество товара'
        },
        exceedLimit: cartItem.quantity >= product.count
      })
    }

    req.session.cart = updateCartItems(req.session.cart, { ...product, quantity });

    return res.redirect('../cart');
  }
};

module.exports = Controller;
