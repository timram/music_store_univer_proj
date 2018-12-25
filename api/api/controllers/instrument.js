const ProxyController = require('../helpers/proxy-controller');
const InstrumentService = require('../services/instrument');

const Controller = {
  getAllInstruments: async (req, res) => {
    const instruments = await InstrumentService.getAllInstruments();
    return res.json(instruments);
  },

  createInstrument: async (req, res) => {
    const instrument = req.swagger.params.Instrument.value;

    const updInstruments = await InstrumentService.createInstrument(instrument);
    return res.json(updInstruments);
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
  }
};

module.exports = ProxyController(Controller);