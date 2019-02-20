const throwError = require('../helpers/throwError');
const path = require('path');
const fs = require('fs');
const randString = require('randomstring');

const decodeBase64Image = image => {
  const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const buf = Buffer.from(matches[2], 'base64');
  return buf;
};

const saveImage = (pathToImage, image) => {
  const decoded = decodeBase64Image(image);
  return fs.writeFileSync(pathToImage, decoded);
};

const getRandomString = () => randString.generate();

const buildImageURL = (bucket, name) =>
  `http://localhost:${process.env.PORT || 3000}/${bucket}/${name}`;

module.exports = (req, res) => {
  const { bucket, name, imageBase64 } = req.body;
  if (!bucket || !name || !imageBase64) {
    throwError({ status: 400, message: 'You should provide bucket, name and imageBase64' });
  }
  
  const pathToBucket = path.resolve(__dirname, '..', '..', 'public', bucket);

  if (!fs.existsSync(pathToBucket)) {
    fs.mkdirSync(pathToBucket);
  }

  const uniqueName = `${getRandomString()}__${name}`;

  const pathToImage = path.resolve(pathToBucket, uniqueName);

  saveImage(pathToImage, imageBase64);

  return res.json({
    image_url: buildImageURL(bucket, uniqueName)
  });
}