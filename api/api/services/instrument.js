const knex = require('../helpers/knex');
const {
  processDBError,
  dbErrorsDescriptors,
  throwError
} = require('../helpers/error-handler');

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

const getUpdInstrumentForDB = (() => {
  const fields = ['name', 'type_id', 'brand_id', 'price', 'count', 'availability'];
  return instrument => fields.reduce((acc, f) => {
    if (!!instrument[f]) {
      return {
        ...acc,
        [f]: instrument[f]
      };
    }
    return acc;
  }, {})
})();

const getInstrumentQuery = () => knex('music_instrument')
  .select(
    'music_instrument.id as id',
    'music_instrument.name as name',
    'music_instrument.type_id as type_id',
    'music_instrument.brand_id as brand_id',
    'music_instrument.price as price',
    'music_instrument.count as count',
    'music_instrument.availability as availability',
    'instrument_brand.name as brand',
    'instrument_type.name as type'
  )
  .innerJoin('instrument_type', 'instrument_type.id', 'music_instrument.type_id')
  .innerJoin('instrument_brand', 'instrument_brand.id', 'music_instrument.brand_id');

const Service = {
  getAllInstruments: async () => getInstrumentQuery(),
    
  getInstrument: async instrID => {
    const [instrument] = await getInstrumentQuery().where('music_instrument.id', instrID);
    
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
      await knex('music_instrument')
        .insert(getUpdInstrumentForDB(instrument));
      
      return Service.getAllInstruments();
    } catch (err) {
      processInstrumentDBErrors(err, instrument);
    }
  },

  updateInstrument: async (instrID, instrument) => {
    try {
      await Service.getInstrument(instrID);
      
      const updInstrument = getUpdInstrumentForDB(instrument);
      await knex('music_instrument')
        .update(updInstrument)
        .where('id', instrID);
      
      return Service.getInstrument(instrID);
    } catch (err) {
      processInstrumentDBErrors(err, instrument);
    }
  }
};

module.exports = Service;