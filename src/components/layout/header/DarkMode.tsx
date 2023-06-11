import { useDarkModeStorage } from '@/hooks/useLocalStorage';
import { darkModeStorage } from '@/models/darkModeLocalStorage';
import DarkModeToggle from 'react-dark-mode-toggle';

export interface DarkModeProps {}

const DarkMode = ({}: DarkModeProps) => {
  const { isDarkMode, isDarkModeRefetch } = useDarkModeStorage();

  const onChange = async () => {
    darkModeStorage.toggleDarkMode();
    isDarkModeRefetch();
  };
  return <DarkModeToggle onChange={onChange} checked={isDarkMode} size={50} />;
};

export default DarkMode;
