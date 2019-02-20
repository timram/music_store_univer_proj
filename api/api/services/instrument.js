const knex = require('../helpers/knex');
const {
  processDBError,
  dbErrorsDescriptors,
  throwError
} = require('../helpers/error-handler');
const config = require('../../config');
const {
  getTotalRowsCount,
  applyRestrictionsToQuery,
  applyOrderToQuery,
  applySelectionToQuery
} = require('../helpers/common-queries');
const { getUpdItemForDB } = require('../helpers/utils');
const { flow } = require('lodash');

const processInstrumentDBErrors = (err, instrument) => processDBError(err, {
  [dbErrorsDescriptors.referenceError.attrName]: {
    brand_id: instrument.brand_id,
    type_id: instrument.type_id
  },
  [dbErrorsDescriptors.uniqueDuplication.attrName]: {
    fields: ['brand_id', 'name'],
    values: [instrument.brand_id, instrument.name]
  }
});

const getUpdInstrumentForDB = getUpdItemForDB({
  fields: ['name', 'type_id', 'brand_id', 'price', 'count', 'availability'],
  uploadImage: true,
  imageNameBuilder: item =>
    `${item.name.replace(/ /g, '_')}_${item.type_id}_${item.brand_id}.jpeg`
})

const instrumentsSelection = [
  'music_instrument.id as id',
  'music_instrument.name as name',
  'music_instrument.type_id as type_id',
  'music_instrument.brand_id as brand_id',
  'music_instrument.price as price',
  'music_instrument.count as count',
  'music_instrument.availability as availability',
  'music_instrument.created_at as created_at',
  'music_instrument.image_url as image_url',
  'instrument_brand.name as brand',
  'instrument_type.name as type'
];

const getInstrumentQuery = ({ type, brand }) => {
  let query = knex('music_instrument')
    .innerJoin('instrument_type', 'instrument_type.id', 'music_instrument.type_id')
    .innerJoin('instrument_brand', 'instrument_brand.id', 'music_instrument.brand_id');
  
  if (type) {
    query = query.whereIn('instrument_type.name', type);
  }
  if (brand) {
    query = query.whereIn('instrument_brand.name', brand);
  }

  return query;
};

const formatFilterString = filterVal => filterVal && filterVal
  .trim()
  .split(',')
  .filter(v => v.length > 0);

const Service = {
  getAllInstruments: async ({
    limit = config.pagination.default.limit,
    offset = config.pagination.default.offset,
    type,
    brand
  }) => {
    const [
      formattedTypes,
      formattedBrand
    ] = [formatFilterString(type), formatFilterString(brand)];

    const instrumentsQuery = getInstrumentQuery({
      type: formattedTypes,
      brand: formattedBrand
    });
    const finalInstrumentsQuery = flow(
      applyRestrictionsToQuery({ limit, offset }),
      applyOrderToQuery('created_at', 'desc'),
      applySelectionToQuery(instrumentsSelection)
    )(instrumentsQuery);

    const [instruments, [{ total }]] = await Promise.all([
      finalInstrumentsQuery,
      getTotalRowsCount(instrumentsQuery)
    ]);

    return {
      items: instruments,
      total: parseFloat(total),
      limit,
      offset,
      filters: { type: formattedTypes, brand: formattedBrand }
    }
  },
    
  getInstrument: async instrID => {
    const [instrument] = await applySelectionToQuery(instrumentsSelection)(
      getInstrumentQuery({})
        .where('music_instrument.id', instrID)
    );
    
    if (!instrument) {
      throwError({
        status: 404,
        message: `There is not instrument with ID = ${instrID}`
      });
    }

    return instrument;
  },

  createInstrument: async instrument => {
    try {
      const formattedInstrument = await getUpdInstrumentForDB(instrument);
      const [newID] = await knex('music_instrument')
        .insert(formattedInstrument)
        .returning('id');
      
      return Service.getInstrument(newID);
    } catch (err) {
      processInstrumentDBErrors(err, instrument);
    }
  },

  updateInstrument: async (instrID, instrument) => {
    try {
      await Service.getInstrument(instrID);
      
      const updInstrument = await getUpdInstrumentForDB(instrument);

      await knex('music_instrument')
        .update(updInstrument)
        .where('id', instrID);
      
      return Service.getInstrument(instrID);
    } catch (err) {
      processInstrumentDBErrors(err, instrument);
    }
  },

  deleteInstrument: async instrID => {
    await Service.getInstrument(instrID);
    return knex('music_instrument')
      .delete()
      .where('id', instrID);
  }
};

module.exports = Service;