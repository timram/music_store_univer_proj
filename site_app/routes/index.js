const express = require('express');
const { requireAllInFolder } = require('../helpers/utils');

const appRouter = express.Router();
 
const allRouters = requireAllInFolder(__dirname);
allRouters.forEach(({ basePath, router }) => appRouter.use(basePath, router));

module.exports = appRouter; 