import { darkModeStorage } from '@/models/darkModeLocalStorage';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useDarkModeStorage = () => {
  //os darkmode 체크
  const { data: isDarkMode = false, refetch: refetchIsDarkMode } = useQuery({
    queryKey: ['darkModeStorage'],
    queryFn: () => darkModeStorage.Data,
  });

  return { isDarkMode, refetchIsDarkMode };
};

export const useSearchLocalStorage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const { data: searchHistoryData = [], refetch: refetchSearchHistoryData } = useQuery({
    queryKey: ['searchLocalStorage', query],
    queryFn: () => searchHistoryLocalStorage.Data,
    enabled: !!searchParams,
  });

  return { searchHistoryData, refetchSearchHistoryData };
};
