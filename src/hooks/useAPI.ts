import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';
import { MyDataType, OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';
import { useMemo } from 'react';

export const useUser = () => {
  const {
    data,
    isLoading: isLoadingMyData,
    error: errorMyData,
    refetch: refetchMyData,
  } = useQuery<MyDataType, AxiosError<{ message: string }>>({
    queryKey: ['/userdata'],
    queryFn: fetcher,
    suspense: false,
  });

  const myData = useMemo(() => (data ? { ...data, role: data.role.toLocaleLowerCase() } : undefined), [data]);
  return { myData, isLoadingMyData, errorMyData, refetchMyData };
};

export const useOwner = () => {
  const { myData } = useUser();
  const [
    { data: ownerMyData, error: errorOwnerMyData, isLoading: isLoadingOwnerMyData, refetch },
    {
      data: ownerMyAllData,
      error: errorOwnerMyAllData,
      isLoading: isLoadingOwnerMyAllData,
      refetch: refetchOwnerMyAllData,
    },
  ] = useQueries<[UseQueryResult<OwnerMyDataType>, UseQueryResult<OwnerMyAllDataType>]>({
    queries: [
      {
        queryKey: [`/owners/${myData?.id}`],
        queryFn: fetcher,
        enabled: !!myData,
      },
      {
        queryKey: [`/owners/${myData?.id}/all-view`],
        queryFn: fetcher,
        enabled: !!myData,
      },
    ],
  });

  const refetchOwnerMydata = () => {
    refetch();
    refetchOwnerMyAllData();
  };

  return {
    ownerMyAllData,
    errorOwnerMyAllData,
    isLoadingOwnerMyAllData,
    ownerMyData,
    errorOwnerMyData,
    isLoadingOwnerMyData,
    refetchOwnerMydata,
  };
};

export const useMember = () => {
  const { myData } = useUser();

  const {
    data: memberMyData,
    isLoading: isLoadingMemberMyData,
    error: errorMemberMyData,
    refetch: refetchMemberMyData,
  } = useQuery<any, AxiosError<{ message: string }>>({
    queryKey: [`/members/${myData?.id}`],
    queryFn: fetcher,
    enabled: !!myData,
  });

  return { memberMyData, isLoadingMemberMyData, errorMemberMyData, refetchMemberMyData };
};
