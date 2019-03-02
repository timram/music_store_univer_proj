const cdn = require('./cdn');

const getOffset = ({ offset, limit }) => offset <= 0
  ? 0
  : limit * offset;

const getUpdItemForDB = ({ fields, uploadImage, imageNameBuilder }) =>
  async (item, ignoreImage) => {
    const mappedItem = fields.reduce((acc, f) => {
      if (typeof item[f] !== 'undefined') {
        return {
          ...acc,
          [f]: item[f]
        };
      }
      return acc;
    }, {});

    if (uploadImage) {
      if (item.image && item.image.length > 0) {
        mappedItem.image_url = await cdn.uploadImage({
          bucket: 'products',
          name: imageNameBuilder(item),
          imageBase64: item.image
        })
      } else if (!ignoreImage) {
        mappedItem.image_url = cdn.getNoImageUrl();
      }
    }

    return mappedItem;
  };

module.exports = {
  getOffset,
  getUpdItemForDB
};
