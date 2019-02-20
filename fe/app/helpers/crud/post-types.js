import apiRequest from '../apiRequest';

export const getPostTypes = async () => {
  const { data } = await apiRequest({
    method: 'get',
    endpoint: '/content/post-types'
  });

  return data;
};

export const mapTypesForSelector = types => types
  .map(({ id, display_name }) => ({
    value: id,
    label: display_name
  }));