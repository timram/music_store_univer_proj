const knex = require('../helpers/knex');
const {
  processDBError,
  dbErrorsDescriptors,
  throwError
} = require('../helpers/error-handler');
const InstrumentService = require('./instrument');

const processOrderDBErrors = (err, order) => processDBError(err, {
  [dbErrorsDescriptors.referenceError.attrName]: {
    account_id: order.account_id,
    item_id: order.items.map(i => i.item_id).join(', ')
  }
});

const updateItem = async (item, trx) => {
  const instrument = await InstrumentService.getInstrument(item.item_id);
  const updCount = instrument.count - item.quantity;
  if (updCount < 0) {
    throwError({
      status: 400,
      message: `Order item ${item.item_id} quantity > instrument count`
    });
  }
  if (!instrument.availability) {
    throwError({
      status: 400,
      message: `Try to add not available item: ${item.item_id}`
    })
  }
  return trx('music_instrument')
    .update({
      count: updCount,
      availability: updCount > 0,
    })
    .where('id', instrument.id);
};

const updateItemsCount = async (items, trx) => Promise.all(
  items.map(i => updateItem(i, trx))
);

const Service = {
  createOrderForCustomer: async (accID, order) => {
    try {
      await knex.transaction(async trx => {
        const [orderID] = await trx('user_order')
          .insert({
            account_id: accID,
            status: order.status || 'pending'
          })
          .returning('id');

        await updateItemsCount(order.items, trx);
        
        const orderItems = order.items.map(i => ({
          ...i,
          order_id: orderID
        }));

        return trx('order_item').insert(orderItems);
      });
      return true;
    } catch (err) {
      processOrderDBErrors(err, order);
    }
  },

  getOrdersForCustomer: async ({
    accID,
    
  })
};

module.exports = Service;
