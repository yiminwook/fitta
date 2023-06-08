import { useEffect, useState } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(() => window.matchMedia('(prefers-color-scheme: dark)').matches); //os darkmode 체크
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={50} />;
};

export default DarkMode;
