const request = require('request-promise');
const baseUrl = 'http://localhost:10010';

module.exports = ({
  method,
  endpoint,
  data,
  token
}) => request[method]({
  url: `${baseUrl}${endpoint}`,
  json: data || true,
  headers: {
    'x-token': token || ''
  }
});