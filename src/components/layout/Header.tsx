import NavChild from '@/components/common/NavChild';
import layout from '@/components/layout/Layout.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={layout['header']}>
      <div>
        <nav>
          <Link to="/">
            <div className={layout['logo']}>
              <span>logo</span>
            </div>
          </Link>
          <ul>
            {/* pageLink 임시 */}
            <NavChild to="/search" content="검색" />
            <NavChild to="/admin" content="Admin" />
            <NavChild to="/signup" content="가입" />
            <NavChild to="/signin" content="로그인" className={layout['signInButton']} />
          </ul>
        </nav>
      </div>
      <div className={layout['block']} />
    </header>
  );
};

export default Header;
