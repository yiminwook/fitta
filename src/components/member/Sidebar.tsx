import NavChild from '@/components/common/NavChild';
import owner from '@/components/owner/Owner.module.scss';
import { useUser } from '@/hooks/useUser';

const MemberSidebar = () => {
  const { data: myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <aside className={owner['ownerSidebar']}>
      <h1>멤버 사이드바</h1>
      <h2>멤버ID &gt;&gt;&gt; {myData!.id}</h2>
      <ul>
        <NavChild to={`/member/${myData!.id}/home`} content="마이페이지" />
        <NavChild to={`/member/${myData!.id}/detail/gym`} content="헬스장 현황" />
        <NavChild to={`/member/${myData!.id}/edit/gym`} content="헬스장 관리" />
      </ul>
    </aside>
  );
};

export default MemberSidebar;
