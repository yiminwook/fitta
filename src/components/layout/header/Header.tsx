import NavChild from '@/components/common/NavChild';
import header from '@/components/layout/header/Header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Profile from '@/components/layout/header/Profile';
import { useCallback, useEffect, useState } from 'react';
import SidebarButton from '@/components/layout/header/SidebarButton';
import Sidebar from '@/components/layout/header/Sidebar';
import { useUser } from '@/hooks/useAPI';
import DarkMode from '@/components/layout/header/DarkMode';
interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { myData, refetchMyData } = useUser();
  console.log('loginUserData >>>', myData);

  const toggleSidebar = () => {
    setShowSidebar((pre) => !pre);
  };

  const closeSidebar = useCallback(() => {
    setShowSidebar(() => false);
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [myData, pathname]);

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
                <DarkMode />
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
            {showSidebar ? <Sidebar closeSidebar={closeSidebar} /> : null}
          </div>
        </div>
        <nav className={header['headerNav']}>
          <ul>
            {/* pageLink 임시 */}
            <NavChild to="/search" content="검색" />
            <NavChild to="/signup" content="가입" />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
