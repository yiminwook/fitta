import { Dispatch, SetStateAction } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';

export interface DarkModeProps {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const DarkMode = ({ isDarkMode, setIsDarkMode }: DarkModeProps) => {
  return <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={50} />;
};

export default DarkMode;
