import NavChild from '@/components/common/NavChild';
import owner from '@/components/owner/Owner.module.scss';
import { useUser } from '@/hooks/useAPI';

const OwnerSidebar = () => {
  const { myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <aside className={owner['ownerSidebar']}>
      <h1>오너 사이드바</h1>
      <h2>오너ID &gt;&gt;&gt; {myData!.id}</h2>
      <ul>
        <NavChild to={`/owner/${myData!.id}/home`} content="마이페이지" />
        <NavChild to={`/owner/${myData!.id}/detail/gym`} content="헬스장 현황" />
        <NavChild to={`/owner/${myData!.id}/detail/staff`} content="스태프 현황" />
        <NavChild to={`/owner/${myData!.id}/detail/member`} content="멤버 현황" />
        <NavChild to={`/owner/${myData!.id}/edit/gym`} content="헬스장 관리" />
        <NavChild to={`/owner/${myData!.id}/edit/staff`} content="스태프 관리" />
        <NavChild to={`/owner/${myData!.id}/edit/member`} content="멤버 관리" />
      </ul>
    </aside>
  );
};

export default OwnerSidebar;
