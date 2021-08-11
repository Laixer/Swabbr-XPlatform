import axios from 'axios';
import router from '../router';

axios.defaults.baseURL = 'https://staging.swabbr.com';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Access-Control-Allow-Origin'] = '*';
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;

    if (
      originalRequest.url == `${axios.defaults.baseURL}/authentication/login`
    ) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url ===
        `${axios.defaults.baseURL}/authentication/refresh-token`
    ) {
      router.push('/login');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post(`${axios.defaults.baseURL}/authentication/refresh-token`, {
          expiredToken: localStorage.getItem('access_token'),
          refresh_token: localStorage.getItem('refresh_token'),
        })
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem('access_token', res.data);
            axios.defaults.headers.common[
              'Authorization'
            ] = localStorage.getItem('access_token');
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
