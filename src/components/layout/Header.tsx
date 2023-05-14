import NavChild from '@/components/common/NavChild';
import layout from '@/components/layout/Layout.module.scss';

const Header = () => {
  return (
    <header className={layout['header']}>
      <nav>
        <ul>
          <NavChild to={'/'} content={'HOME'} />
          <NavChild to={'/signin'} content={'Sign In'} />
        </ul>
      </nav>
      <div className={layout['block']} />
    </header>
  );
};

export default Header;
