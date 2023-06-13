import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';
import { MyDataType, OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';
import { useEffect } from 'react';

export const useUser = () => {
  let {
    data: myData,
    isLoading: isLoadingMyData,
    error: errorMyData,
    refetch: refetchMyData,
  } = useQuery<MyDataType, AxiosError<{ message: string }>>({
    queryKey: ['/userdata'],
    queryFn: fetcher,
    suspense: false,
  });

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
  ] = useQueries<[UseQueryResult<OwnerMyAllDataType>, UseQueryResult<OwnerMyDataType>]>({
    queries: [
      {
        queryKey: [`/owners/${myData?.id}/all-view`],
        queryFn: fetcher,
        enabled: !!myData,
      },
      {
        queryKey: [`/owners/${myData?.id}`],
        queryFn: fetcher,
        enabled: !!myData,
      },
    ],
  });

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
