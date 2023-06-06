import NavChild from '@/components/common/NavChild';
import sidebar from '@/components/layout/header/Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={sidebar['sidebar']}>
      <header>
        <h1 className="blind">사이드바</h1>
      </header>
      <ul>
        {/* pageLink 임시 */}
        <NavChild to="/search" content="검색" />
        <NavChild to="/owner/123" content="오너" />
        <NavChild to="/signup" content="가입" />
        <NavChild to="/signin" content="로그인" />
        <NavChild to="" content="로그아웃" />
      </ul>
    </aside>
  );
};

export default Sidebar;
