const {
  getStocks,
  getNews,
  getLatestProducts
} = require('../helpers/common-requests');

module.exports = {
  viewHome: async (req, res) => {
    const [
      stocks,
      news,
      products
    ] = await Promise.all([getStocks(), getNews(), getLatestProducts()]);

    return res.render('index', {
      title: 'Главная',
      stocks: stocks.items,
      news: news.items,
      products: products.items
    });
  }
};