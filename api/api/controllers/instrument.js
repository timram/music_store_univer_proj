const ProxyController = require('../helpers/proxy-controller');
const InstrumentService = require('../services/instrument');

const Controller = {
  getAllInstruments: async (req, res) => {
    const instruments = await InstrumentService.getAllInstruments({
      offset: req.swagger.params.offset.value,
      limit: req.swagger.params.limit.value,
      type: req.swagger.params.type.value,
      brand: req.swagger.params.brand.value,
    });
    return res.json(instruments);
  },

  createInstrument: async (req, res) => {
    const instrument = req.swagger.params.Instrument.value;

    const newInstr = await InstrumentService.createInstrument(instrument);
    return res.json(newInstr);
  },

  getInstrument: async (req, res) => {
    const instrumentID = req.swagger.params.instrumentID.value;

    const instr = await InstrumentService.getInstrument(instrumentID);
    return res.json(instr);
  },

  updateInstrument: async (req, res) => {
    const instrumentID = req.swagger.params.instrumentID.value;
    const instrument = req.swagger.params.Instrument.value;

    const updInstrument = await InstrumentService.updateInstrument(instrumentID, instrument);
    return res.json(updInstrument);
  },

  deleteInstrument: async (req, res) => {
    const instrumentID = req.swagger.params.instrumentID.value;

    const updInstrument = await InstrumentService.deleteInstrument(instrumentID);
    return res.status(204).send();
  }
};

module.exports = ProxyController(Controller);