import { getEnv } from '@/utils/getEnv';

export const envConfig = () => {
  const REACT_APP_SERVER_URL = getEnv('REACT_APP_SERVER_URL');
  const REACT_APP_SITE_URL = getEnv('REACT_APP_SITE_URL');

  return { REACT_APP_SERVER_URL, REACT_APP_SITE_URL };
};
