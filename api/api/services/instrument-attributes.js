const knex = require('../helpers/knex');
const {
  processDBError,
  throwError,
  dbErrorsDescriptors
} = require('../helpers/error-handler');

const attributesTableNameMapping = {
  'types': 'instrument_type',
  'brands': 'instrument_brand'
};

const Service = {
  getAllAttributes: attr => knex(attributesTableNameMapping[attr]),
  
  getAttribute: async (attr, attrID) => {
    const [attribute] = await knex(attributesTableNameMapping[attr])
      .where('id', attrID);
    
    if (!attribute) {
      throwError({
        status: 404,
        message: `There is no instrument attribute: ${attr} with ID: ${attrID}`
      })
    }

    return attribute;
  },

  createAttribute: async (attr, name) => {
    try {
      await knex(attributesTableNameMapping[attr])
        .insert({ name });
      return Service.getAllAttributes(attr);
    } catch (err) {
      processDBError(err, {
        [dbErrorsDescriptors.uniqueDuplication.attrName]: {
          fields: [attr],
          values: [name]
        }
      });
    }
  },

  updateAttribute: async (attr, attrID, name) => {
    try {
      await Service.getAttribute(attr, attrID);
      await knex(attributesTableNameMapping[attr])
        .update({ name })
        .where('id', attrID);
      return Service.getAttribute(attr, attrID);
    } catch (err) {
      processDBError(err, {
        [dbErrorsDescriptors.uniqueDuplication.attrName]: {
          fields: [attr],
          values: [name]
        }
      });
    }
  }
};

module.exports = Service;