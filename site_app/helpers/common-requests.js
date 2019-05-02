const apiRequest = require('./api-request');

const getPosts = type => apiRequest({
  method: 'get',
  endpoint: `/content/posts?post_type=${type}&enabled=true`
});

module.exports = {
  login: ({ login, password }) => apiRequest({
    method: 'post',
    endpoint: '/account/login',
    data: { login, password, role: 'customer' }
  }),

  updateAccount: ({ email, fname, lname, token, id }) => apiRequest({
    method: 'put',
    endpoint: `/account/profile/${id}`,
    data: { email, fname, lname },
    token
  }),

  registerAccount: ({ email, fname, lname, password }) => apiRequest({
    method: 'post',
    endpoint: '/register',
    data: { email, fname, lname, password }
  }),
  
  getLatestProducts: () => apiRequest({
    method: 'get',
    endpoint: '/instruments?sort_field=created_at&sort_order=desc&available=true&limit=3'
  }),

  getProduct: id => apiRequest({
    method: 'get',
    endpoint: `/instruments/${id}`
  }),

  createOrder: (account, cart) => apiRequest({
    method: 'post',
    endpoint: `/orders/${account.id}`,
    data: {
      items: cart.items.map(i => ({ item_id: i.id, quantity: i.quantity }))
    },
    token: account.token
  }),


  getStocks: () => getPosts('stock'),
  getNews: () => getPosts('news'),
  getBlogs: () => getPosts('blog')
};