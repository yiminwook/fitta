import NavChild from '@/components/common/NavChild';
import signup from '@/components/signUp/SignUp.module.scss';
import { useLocation } from 'react-router-dom';

const NavSection = () => {
  const { pathname } = useLocation();

  const isLocate = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <section className={signup['navSection']}>
      <nav>
        <ul>
          <NavChild className={isLocate('member') ? signup['active'] : ''} to="/signup/member" content="개인회원" />
          <NavChild className={isLocate('owner') ? signup['active'] : ''} to="/signup/owner" content="사업자회원" />
        </ul>
      </nav>
    </section>
  );
};

export default NavSection;
