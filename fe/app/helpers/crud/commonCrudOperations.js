import apiRequest from '../apiRequest';
import { applyQueryParams } from '../../helpers/searchParams';

export default ({
  baseEndpoint,
  fields
}) => {
  const mapResourceForAPI = resource => fields.reduce((acc, f) => {
    if (typeof resource[f] !== 'undefined') {
      return {
        ...acc,
        [f]: resource[f]
      };
    }
    return acc;
  }, {});

  return {
    getResourcesList: async queryParams => {
      const params = Object.keys(queryParams)
        .map(name => ({ name, value: queryParams[name] }));
      
      const { data } = await apiRequest({
        method: 'get',
        endpoint: applyQueryParams({
          params,
          url: baseEndpoint
        })
      });

      return data;
    }, 

    getResource: async resID => {
      const { data } = await apiRequest({
        method: 'get',
        endpoint: `${baseEndpoint}/${resID}`
      })
      return data;
    },

    createResource: async resource => {
      const { data } = await apiRequest({
        method: 'post',
        endpoint: baseEndpoint,
        data: mapResourceForAPI(resource)
      });
      return data;
    },

    updateResource: async (resID, resource) => {
      const { data } = await apiRequest({
        method: 'put',
        endpoint: `${baseEndpoint}/${resID}`,
        data: mapResourceForAPI(resource)
      });
      return data;
    },

    deleteResource: async resID => {
      const { data } = await apiRequest({
        method: 'delete',
        endpoint: `${baseEndpoint}/${resID}`
      });
      return data;
    }
  };
};