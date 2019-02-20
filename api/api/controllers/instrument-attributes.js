const ProxyController = require('../helpers/proxy-controller');
const InstrumentAttrsService = require('../services/instrument-attributes');

const Controller = {
  getAllAttributes: async (req, res) => {
    const attrName = req.swagger.params.attrName.value;

    const attributes = await InstrumentAttrsService.getAllAttributes(attrName);
    return res.json(attributes);
  },

  getAttribute: async (req, res) => {
    const attrName = req.swagger.params.attrName.value;
    const attrID = req.swagger.params.attrID.value;
    
    const attribute = await InstrumentAttrsService.getAttribute(attrName, attrID);
    return res.json(attribute);
  },

  createAttribute: async (req, res) => {
    const attrName = req.swagger.params.attrName.value;
    const attr = req.swagger.params.Attribute.value;
    
    const updAttrs = await InstrumentAttrsService.createAttribute(attrName, attr.name);
    return res.json(updAttrs);
  },

  updateAttribute: async (req, res) => {
    const attrName = req.swagger.params.attrName.value;
    const attrID = req.swagger.params.attrID.value;
    const attr = req.swagger.params.Attribute.value;
    
    const attribute = await InstrumentAttrsService.updateAttribute(attrName, attrID, attr.name);
    return res.json(attribute);
  },

  deleteAttribute: async (req, res) => {
    const attrName = req.swagger.params.attrName.value;
    const attrID = req.swagger.params.attrID.value;

    const updAttributes = await InstrumentAttrsService.deleteAttribute(attrName, attrID);
    return res.json(updAttributes);
  }
};

module.exports = ProxyController(Controller);