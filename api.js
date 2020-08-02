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

export default {
  urls: token => callApi('get', '/users/token/', '', token),
  register: form => callApi('post', '/users/token/', form),
  domain: (form, token) => callApi('put', '/domains/del/', form, token),
  registUrl: (form, token) =>
    callApi('post', '/domains/registUrl/', form, token),
  change: (form, token) => callApi('put', '/domains/toggle/', form, token),
};
