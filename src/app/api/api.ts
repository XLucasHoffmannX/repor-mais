import axios from 'axios';
import Cookies from 'js-cookie';

import { env } from '../config';

export const Http = axios.create({
  baseURL: env.VITE_APP_URL_ROOT
});

export const HttpAuth = axios.create({
  baseURL: env.VITE_APP_URL_ROOT
});

HttpAuth.interceptors.request.use(config => {
  config.headers.authorization = Cookies.get('access-token');
  return config;
});

HttpAuth.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        Cookies.remove('access-token', {
          path: '/',
          domain:
            import.meta.env.ENV === 'production'
              ? import.meta.env.COOKIE_DOMAIN
              : import.meta.env.COOKIE_LOCAL
        });

        return window.location.replace('/');
      }

      return error;
    }
  }
);
