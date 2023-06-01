import NavChild from '@/components/common/NavChild';
import header from '@/components/layout/header/Header.module.scss';
import { handleAxiosError } from '@/models/customAxios';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Profile from '@/components/layout/header/Profile';

interface HeaderProps {
  userData: any;
  handleUserData: (data: any) => void;
}

const Header = ({ userData, handleUserData }: HeaderProps) => {
  const onClick = async () => {
    try {
      const response = await axios.get<{ userData: string }>('/userDummy.json');
      handleUserData(response.data.userData);
    } catch (error) {
      console.error(error);
      handleAxiosError(error);
    }
  };

  return (
    <header className={header['header']}>
      <div className={header['headerInner']}>
        <div>
          <div>
            <Link to="/">
              <div className={header['logo']}>
                <span>logo</span>
              </div>
            </Link>
            <ul>
              {!userData ? (
                <li>
                  <a>
                    <button className={header['signInButton']} onClick={onClick}>
                      로그인
                    </button>
                  </a>
                </li>
              ) : (
                <li>
                  <Profile userData={userData} />
                </li>
              )}
            </ul>
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
      <div className={header['block']} />
    </header>
  );
};

export default Header;
