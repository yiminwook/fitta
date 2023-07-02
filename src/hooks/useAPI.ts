import { useQuery, useQueries, UseQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import fetcher from '@/hooks/fetcher';
import axios, { AxiosError } from 'axios';
import { GymType, MyDataType, OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleToastError } from '@/utils/handleToast';

export const useSignOut = () => {
  const navigate = useNavigate();
  const { refetchMyData } = useUser();

  const signOut = async () => {
    try {
      const responese = await axios.post('/signout');
      if (responese.status === 200) {
        navigate('/');
        toast.success('로그아웃 성공');
        refetchMyData();
      }
    } catch (error) {
      handleToastError(error);
    }
  };

  return { signOut };
};

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
        suspense: false,
      },
      {
        queryKey: [`/owners/${myData?.id}/all-view`],
        queryFn: fetcher,
        enabled: !!myData,
        suspense: false,
      },
    ],
  });

  const refetchOwnerMydata = () => {
    refetch();
    refetchOwnerMyAllData();
  };

  const reverseGymList = useMemo(() => {
    return ownerMyData?.gymList.slice().reverse() || [];
  }, [ownerMyData]);

  return {
    ownerMyAllData,
    reverseGymList,
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

interface GymResponseType {
  content: GymType[];
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export const useGymList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const {
    data: gymListData,
    fetchNextPage: fetchNextPageGymListData,
    hasNextPage: hasNextPageGymListData,
    refetch: refetchGymListData,
  } = useInfiniteQuery({
    queryKey: [`/gyms`, query],
    queryFn: async ({ pageParam = 0, queryKey }) => {
      const response = await axios.get<GymResponseType>(queryKey[0], {
        params: { page: pageParam, query },
      });
      return response.data;
    },
    getNextPageParam: (lastPage, _allPage) => {
      const { number, totalPages } = lastPage;
      return number === totalPages ? undefined : number + 1;
    },
    suspense: false,
    cacheTime: 0,
  });

  return { gymListData, fetchNextPageGymListData, hasNextPageGymListData, refetchGymListData };
};
