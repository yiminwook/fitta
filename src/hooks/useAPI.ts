import { useQuery, useQueries, UseQueryResult } from 'react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';
import { MyDataType, OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';

export const useUser = () => {
  const {
    data: myData,
    isLoading: isLoadingMyData,
    error: errorMyData,
    refetch: refetchMyData,
  } = useQuery<MyDataType, AxiosError<{ message: string }>>('/userdata', fetcher);
  return { myData, isLoadingMyData, errorMyData, refetchMyData };
};

export const useOwner = () => {
  const { myData } = useUser();
  const [
    {
      data: ownerMyAllData,
      error: errorOwnerMyAllData,
      isLoading: isLoadingOwnerMyAllData,
      refetch: refetchOwnerMyAllData,
    },
    { data: ownerMyData, error: errorOwnerMyData, isLoading: isLoadingOwnerMyData, refetch: refetchOwnerMyData },
  ] = useQueries<[UseQueryResult<OwnerMyAllDataType>, UseQueryResult<OwnerMyDataType>]>([
    {
      queryKey: `/owners/${myData?.id}/all-view`,
      queryFn: fetcher,
      enabled: !!myData,
    },
    {
      queryKey: `/owners/${myData?.id}`,
      queryFn: fetcher,
      enabled: !!myData,
    },
  ]);

  return {
    ownerMyAllData,
    errorOwnerMyAllData,
    isLoadingOwnerMyAllData,
    refetchOwnerMyAllData,
    ownerMyData,
    errorOwnerMyData,
    isLoadingOwnerMyData,
    refetchOwnerMyData,
  };
};
