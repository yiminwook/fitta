import { darkModeStorage } from '@/models/darkModeLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useDarkModeStorage = () => {
  //os darkmode 체크
  let { data: isDarkMode, refetch: isDarkModeRefetch } = useQuery(['darkModeStorage'], () => darkModeStorage.Data);
  if (isDarkMode === undefined) isDarkMode = false;
  return { isDarkMode, isDarkModeRefetch };
};
