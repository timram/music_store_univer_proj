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

const attrFeToDBMapping = {
  'types': 'type',
  'brands': 'brand'
};

const Service = {
  getAllAttributes: async attr => {
    const tableName = attributesTableNameMapping[attr];
    const dbAttr = attrFeToDBMapping[attr];

    const records = await knex(tableName)
      .select(
        `${tableName}.id as id`,
        `${tableName}.name as name`
      )
      .count('music_instrument.id as count')
      .leftJoin('music_instrument', `music_instrument.${dbAttr}_id`, `${tableName}.id`)
      .groupBy(
        `${tableName}.id`,
        `${tableName}.name`
      );

    return records.map(r => ({ ...r, count: parseFloat(r.count) }))
  },
  
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
  },

  deleteAttribute: async (attr, attrID) => {
    await Service.getAttribute(attr, attrID);
    await knex(attributesTableNameMapping[attr])
      .delete()
      .where('id', attrID);
    return Service.getAllAttributes(attr);
  }
};

module.exports = Service;