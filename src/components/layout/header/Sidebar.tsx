import NavChild from '@/components/common/NavChild';
import sidebar from '@/components/layout/header/Sidebar.module.scss';
import DarkMode, { DarkModeProps } from '@/components/layout/header/DarkMode';
import MenuProfile from '@/components/layout/header/MenuProfile';
import { useUser } from '@/hooks/useAPI';

interface SidebarProps extends DarkModeProps {
  closeSidebar: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { myData } = useUser();

  return (
    <aside className={sidebar['sidebar']}>
      <header>
        <h1 className="blind">사이드바</h1>
        <DarkMode />
      </header>
      {myData ? <MenuProfile /> : null}
      <ul>
        {/* pageLink 임시 */}
        <NavChild to="/" content="홈" onClick={closeSidebar} />
        {!myData ? <NavChild to="/signin" content="로그인" onClick={closeSidebar} /> : null}
        <NavChild to="/search" content="검색" onClick={closeSidebar} />
        <NavChild to="/signup" content="가입" onClick={closeSidebar} />
      </ul>
    </aside>
  );
};

export default Sidebar;
