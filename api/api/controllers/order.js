const proxyController = require('../helpers/proxy-controller');
const OrderService = require('../services/order');

const Controller = {
  createOrderForCustomer: async (req, res) => {
    const accID = req.swagger.params.accID.value;
    const order = req.swagger.params.Order.value;
    
    await OrderService.createOrderForCustomer(accID, order);
    
    return res.status(204).send();
  }
};

module.exports = proxyController(Controller);