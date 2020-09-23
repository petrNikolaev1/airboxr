import axios, { CancelToken } from 'axios';
import { get } from 'lodash';

import { API_URL, API_TOKEN } from 'constants/index';

const errorResponseHandler = error => {
  const response = get(error, 'response');
  if (response) {
    return Promise.reject(error);
  }
};

export const request = axios.create({
  baseURL: `${API_URL}/`,
});

const cancel = {};

request.interceptors.request.use(config => {
  /*
  To cancel non-actual requests
   */
  const requestId = get(config, 'params.requestId');

  if (requestId) {
    if (cancel[requestId]) {
      cancel[requestId]();
    }

    // @ts-ignore
    config.cancelToken = new CancelToken(function executor(c) {
      cancel[requestId] = c;
    });
  }

  /*
  To handle Auth
   */

  config.headers.Authorization = `Bearer ${API_TOKEN}`;

  return config;
});

request.interceptors.response.use(response => response, errorResponseHandler);

export const requestMiddleware = request => async (data?: any) => {
  try {
    const response = await request(data);
    return { res: response.data };
  } catch (error) {
    const errorData = error.response?.data;

    return {
      err: errorData || { detail: error.toString() },
    };
  }
};

export default request;
