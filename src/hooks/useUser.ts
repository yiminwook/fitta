import { useQuery } from 'react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';

export interface result {
  email: string;
}

export const useUser = () => {
  const { data, isLoading, error } = useQuery<result, AxiosError>('/members/testuserdata', fetcher);

  return { data, isLoading, error };
};
