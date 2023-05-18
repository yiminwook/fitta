import NavChild from '@/components/common/NavChild';
import layout from '@/components/layout/Layout.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={layout['header']}>
      <div>
        <nav>
          <Link to="/" ><img src="/img/fitta-cutout.png" className={layout['logo']}></img></Link>
          <ul>
            {/* pageLink 임시 */}
            <NavChild to="/admin" content="Admin" />
            <NavChild to="/signup" content="회원가입" />
            <NavChild to="/signin" content="로그인" className={layout['signInButton']} />
          </ul>
        </nav>
      </div>
      <div className={layout['block']} />
    </header>
  );
};

export default Header;
