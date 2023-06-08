import NavChild from '@/components/common/NavChild';
import sidebar from '@/components/layout/header/Sidebar.module.scss';
import DarkMode, { DarkModeProps } from '@/components/layout/header/DarkMode';

interface SidebarProps extends DarkModeProps {
  signOut: () => void;
}

const Sidebar = ({ isDarkMode, setIsDarkMode, signOut }: SidebarProps) => {
  return (
    <aside className={sidebar['sidebar']}>
      <header>
        <h1 className="blind">사이드바</h1>
        <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </header>
      <ul>
        {/* pageLink 임시 */}
        <NavChild to="/search" content="검색" />
        <NavChild to="/owner/123" content="오너" />
        <NavChild to="/signup" content="가입" />
        <NavChild to="/signin" content="로그인" />
      </ul>
      <footer>
        <button onClick={signOut}>로그아웃</button>
      </footer>
    </aside>
  );
};

export default Sidebar;
