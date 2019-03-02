const getTotalQuantity = items => items
  .reduce((acc, item) => acc + item.quantity, 0);

module.exports = {
  updateCartItems: (cart, item) => {
    const cartItems = (cart && cart.items) || [];
    const existsItem = cartItems.find(i => i.id === item.id) || { quantity: 0 };
    item.quantity += existsItem.quantity;

    const updItems = cartItems
      .filter(i => i.id !== item.id)
      .concat(item);

    return {
      items: updItems,
      quantity: getTotalQuantity(updItems)
    };
  },

  getCartItem: (cart, id) => cart
    ? cart.items.find(i => i.id === id) || { quantity: 0 }
    : { quantity: 0 },

  deleteCartItem: (cart, id) => {
    if (!cart) {
      return cart;
    }

    const updItems = cart.items.filter(i => i.id !== id);
    if (updItems.length === 0) {
      return null;
    }

    return {
      items: updItems,
      quantity: getTotalQuantity(updItems)
    }
  },

  getTotalPrice: cart => cart
    ? cart.items.reduce((acc, i) => acc + (i.price * i.quantity), 0)
    : 0
};