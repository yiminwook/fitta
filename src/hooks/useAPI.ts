import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query';
import fetcher from '@/hooks/fetcher';
import { AxiosError } from 'axios';
import { MyDataType, OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';

export const useUser = () => {
  const {
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
