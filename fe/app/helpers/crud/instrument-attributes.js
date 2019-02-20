import apiRequest from '../apiRequest';

export const getAttributes = attrName => async () => {
  const { data } = await apiRequest({
    method: 'get',
    endpoint: `/instrument/${attrName}`
  });

  return data;
};

export const createAttribute = attrName => async value => {
  try {
    const { data } = await apiRequest({
      method: 'post',
      endpoint: `/instrument/${attrName}`, 
      data: {
        name: value
      }
    });

    return data;
  } catch (err) {
    if (err.response && (err.response.status === 400)) {
      return false;
    }
    throw err;
  }
}

export const deleteAttribute = attrName => async attrID => {
  const { data } = await apiRequest({
    method: 'delete',
    endpoint: `/instrument/${attrName}/${attrID}`
  });

  return data;
}

export const mapAttributesForSelector = attrs => attrs
  .map(({ id, name, count }) => ({
    value: id,
    label: name,
    deleteable: count === 0
  }));