import axios from 'axios';

const callApi = async (method, path, data, jwt) => {
  const headers = {
    Authorization: jwt,
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://www.machapi.site'; //to do version url
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

const callAPNSToken = async (method, data) => {
  const headers = {
    Authorization:
      'key=AAAAdB_yNRA:APA91bEhZNSsq5uh-JA5uJO0OjuzmjBMjXxXgxxWcf0oW12E16vw2IedmM32wU_ZVi12RML-lxf_1c_MXLnU6Q7b4r4UQhVwrdX8S7_e-3erYMVQrXPL64-AJT63AtWq6uZ8BuzgV2cn',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'https://iid.googleapis.com/iid/v1:batchImport';
  return axios[method](baseUrl, data, {headers});
};

export default {
  urls: (token) => callApi('get', '/users/token/', '', token),
  register: (form) => callApi('post', '/users/token/', form),
  domain: (form, token) => callApi('put', '/domains/del/', form, token),
  registUrl: (form, token) =>
    callApi('post', '/domains/registUrl/', form, token),
  change: (form, token) => callApi('put', '/domains/toggle/', form, token),
  getAPNSToken: (form) => callAPNSToken('post', form),
  post_filterling: (form, token) =>
    callApi('post', '/domains/toggle/', form, token),
};
