const fs = require('fs');
const { join } = require('path');

module.exports = {
  requireAllInFolder: pathToFolder => fs
    .readdirSync(pathToFolder)
    .filter(f => f !== 'index.js')
    .map(f => require(join(pathToFolder, f))),

  asyncWrapper: func => async (req, res) => {
    try {
      await func(req, res);
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  }
};