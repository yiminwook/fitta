import NavChild from '@/components/common/NavChild';
import header from '@/components/layout/header/Header.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Profile from '@/components/layout/header/Profile';
import { useState } from 'react';
import SidebarButton from '@/components/layout/header/SidebarButton';
import Sidebar from '@/components/layout/header/Sidebar';
import { useUser } from '@/hooks/useUser';

interface HeaderProps {
  handleUserData: (data: any) => void;
}

const Header = ({ handleUserData }: HeaderProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { data: userData } = useUser();

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
              {!userData ? (
                <li>
                  <a>
                    <button className={header['signInButton']} onClick={() => {}}>
                      로그인
                    </button>
                  </a>
                </li>
              ) : (
                <li>
                  <Profile />
                </li>
              )}
            </ul>
            <SidebarButton showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            {showSidebar ? <Sidebar /> : null}
          </div>
        </div>
        <nav className={header['headerNav']}>
          <ul>
            {/* pageLink 임시 */}
            <NavChild to="/search" content="검색" />
            <NavChild to="/owner/123" content="오너" />
            <NavChild to="/signup" content="가입" />
            <NavChild to="/signin" content="로그인" />
          </ul>
        </nav>
      </div>
      {/* <div className={header['block']} /> */}
    </header>
  );
};

export default Header;
