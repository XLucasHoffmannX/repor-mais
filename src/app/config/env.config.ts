import { IEnv } from './config.types';

export const env: IEnv = {
  ENV: import.meta.env.ENV,
  VITE_MOCK_API: import.meta.env.VITE_MOCK_API,
  VITE_APP_URL_ROOT: import.meta.env.VITE_APP_URL_ROOT,
  COOKIE_DOMAIN: import.meta.env.COOKIE_DOMAIN,
  COOKIE_LOCAL: import.meta.env.COOKIE_LOCAL
};
