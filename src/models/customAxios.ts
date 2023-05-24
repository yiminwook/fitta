import { envConfig } from '@/configs';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_SERVER_URL } = envConfig();

export const customAxios = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  withCredentials: true,
});

export const handleAxiosError = (error: unknown) => {
  if (!(error instanceof AxiosError)) return;
  toast.error('통신에러');
};
