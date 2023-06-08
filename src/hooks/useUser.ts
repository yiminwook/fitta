import { useQuery } from 'react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';
import { MyDataType } from '@/types/fittaApi';

export const useUser = () => {
  const { data, isLoading, error, refetch } = useQuery<MyDataType, AxiosError<{ message: string }>>(
    '/userdata',
    fetcher,
  );
  return { data, isLoading, error, refetch };
};
