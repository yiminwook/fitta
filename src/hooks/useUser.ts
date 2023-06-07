import { useQuery } from 'react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';

export interface UserData {
  email: string;
  name: string;
  id: string;
  isOwner?: boolean;
}

export const useUser = () => {
  // /members/testuserdata
  // /owners/testuserdata
  const { data, isLoading, error } = useQuery<UserData, AxiosError>('/owners/testuserdata', fetcher);

  return { data, isLoading, error };
};
