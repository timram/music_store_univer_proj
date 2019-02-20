import Cookies from 'js-cookie';
import { tokenTTLinDays } from '../config';
import apiRequest from './apiRequest';

export const getAccount = async accCreds => {
  try {
    const token = Cookies.get('x-token');
    if (!token && !accCreds) return null;
    const account = await apiRequest({
      method: 'post',
      endpoint: !!accCreds ? '/account/login' : '/account/check',
      token,
      data: accCreds || {}     
    });
    return account.data;
  } catch (err) {
    
    if (err.response && (err.response.status === 403 || err.response.status === 401)) {
      return null;
    }
    throw err;
  }
};

export const saveAccount = ({ token }) => Cookies.set('x-token', token);