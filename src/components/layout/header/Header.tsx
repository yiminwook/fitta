import NavChild from '@/components/common/NavChild';
import header from '@/components/layout/header/Header.module.scss';
import { Link, Navigate } from 'react-router-dom';
import Profile from '@/components/layout/header/Profile';
import { useEffect, useState } from 'react';
import SidebarButton from '@/components/layout/header/SidebarButton';
import Sidebar from '@/components/layout/header/Sidebar';
import { useUser } from '@/hooks/useUser';
import DarkMode from '@/components/layout/header/DarkMode';
import { darkModeStorage } from '@/models/darkModeLocalStorage';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data: myData } = useUser();
  console.log('loginUserData >>>', myData);

  const toggleSidebar = () => {
    setShowSidebar((pre) => !pre);
  };

  // const onClick = async () => {
  //   try {
  //     const response = await axios.get<{ userData: string }>('/userDummy.json');
  //     handleUserData(response.data.userData);
  //   } catch (error) {
  //     console.error(error);
  //     handleAxiosError(error);
  //   }
  // };

  useEffect(() => {
    setIsDarkMode(() => darkModeStorage.Data); //os darkmode 체크
  }, []);

  useEffect(() => {
    darkModeStorage.setState(isDarkMode);
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  if (myData === undefined) {
    return null;
  }

  return (
    <header className={header['header']}>
      <div className={header['headerWrapper']}>
        <div className={header['headerOutter']}>
          <div className={header['headerInner']}>
            <Link to="/">
              <div className={header['logo']}>
                <span className="blind">logo</span>
              </div>
            </Link>
            <ul className={header['headerRight']}>
              <li>
                <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </li>
              {!myData ? (
                <li>
                  <Link to="/signin" className={header['signInButton']}>
                    로그인
                  </Link>
                </li>
              ) : (
                <li>
                  <Profile />
                </li>
              )}
            </ul>
            <SidebarButton showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            {showSidebar ? <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> : null}
          </div>
        </div>
        <nav className={header['headerNav']}>
          <ul>
            {/* pageLink 임시 */}
            <NavChild to="/search" content="검색" />
            <NavChild to={`/owner/${myData!.id}/home`} content="오너" />
            <NavChild to="/signup" content="가입" />
            <NavChild to="/signin" content="로그인" />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
