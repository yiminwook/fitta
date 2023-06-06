import { envConfig } from '@/configs';
import axios, { AxiosError } from 'axios';

const { REACT_APP_SERVER_URL } = envConfig();

export const customAxios = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  withCredentials: true,
});
