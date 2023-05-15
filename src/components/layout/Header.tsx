import NavChild from '@/components/common/NavChild';
import layout from '@/components/layout/Layout.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={layout['header']}>
      <div>
        <nav>
          <Link to="/">HOME</Link>
          <ul>
            {/* pageLink */}
            <NavChild to={'/admin'} content={'AdminPage'} />
            <NavChild to={'/signin'} content={'Sign In'} className={layout['signInButton']} />
          </ul>
        </nav>
      </div>
      <div className={layout['block']} />
    </header>
  );
};

export default Header;
