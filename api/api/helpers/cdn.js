const request = require('request-promise');
const config = require('../../config');

const uploadImage = async ({ bucket, name, imageBase64 }) => {
  const { image_url } = await request.post({
    url: `${config.cdn.url}/upload`,
    json: {
      bucket,
      name,
      imageBase64
    }
  });

  return image_url
};

const getNoImageUrl = () => `${config.cdn.url}/defaults/no_image.png`

module.exports = {
  uploadImage,
  getNoImageUrl
};
