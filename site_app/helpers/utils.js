const fs = require('fs');
const { join } = require('path');

module.exports = {
  requireAllInFolder: pathToFolder => fs
    .readdirSync(pathToFolder)
    .filter(f => f !== 'index.js')
    .map(f => require(join(pathToFolder, f)))
};