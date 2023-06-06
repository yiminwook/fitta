import NavChild from '@/components/common/NavChild';
import { Navigate, useParams } from 'react-router-dom';
import owner from '@/components/owner/Owner.module.scss';
import { useUser } from '@/hooks/useUser';

const OwnerSidebar = () => {
  const { data: userData } = useUser();

  if (userData === undefined) {
    return <Navigate to={'/404'} />;
  }

  return (
    <aside className={owner['ownerSidebar']}>
      <h1>오너 사이드바</h1>
      <h2>오너ID &gt;&gt;&gt; {userData.id}</h2>
      <ul>
        <NavChild to={`/owner/${userData.id}/home`} content="마이페이지" />
        <NavChild to={`/owner/${userData.id}/detail/gym`} content="헬스장 현황" />
        <NavChild to={`/owner/${userData.id}/detail/staff`} content="스태프 현황" />
        <NavChild to={`/owner/${userData.id}/detail/member`} content="멤버 현황" />
        <NavChild to={`/owner/${userData.id}/edit/gym`} content="헬스장 관리" />
        <NavChild to={`/owner/${userData.id}/edit/staff`} content="스태프 관리" />
        <NavChild to={`/owner/${userData.id}/edit/member`} content="멤버 관리" />
      </ul>
    </aside>
  );
};

export default OwnerSidebar;
