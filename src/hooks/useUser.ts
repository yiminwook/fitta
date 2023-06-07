import { useQuery } from 'react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';
import { MyDataType } from '@/types/fittaApi';

export const useUser = () => {
  const { data, isLoading, error } = useQuery<MyDataType, AxiosError>('/userdata', fetcher);

  return { data, isLoading, error };
};
