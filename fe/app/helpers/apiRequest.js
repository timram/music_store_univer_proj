import { apiUrl } from '../config';
import axios from 'axios';
import Cookies from 'js-cookie';

export default ({ method, endpoint, data = {} }) => {
  const token = Cookies.get('x-token');
  return axios({
    baseURL: apiUrl,
    url: endpoint,
    method,
    data,
    headers: { 'x-token': token || '' }
  });
};