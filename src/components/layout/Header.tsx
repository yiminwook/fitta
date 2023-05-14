import NavChild from '@/components/common/NavChild';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <NavChild to={'/'} content={'HOME'} />
          <NavChild to={'/signin'} content={'Sign In'} />
        </ul>
      </nav>
      <div />
    </header>
  );
};

export default Header;
