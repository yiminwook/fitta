import NavChild from '@/components/common/NavChild';
import member from '@/components/member/Member.module.scss';
import { useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';

const MemberSidebar = () => {
  const { myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <aside className={member['sidebar']}>
      <h1 className="blind">멤버 사이드바</h1>
      <Link to={`/member/${myData!.id}/home`}>마이페이지(오너)</Link>
      <ul>
        <NavChild to={`/member/${myData!.id}/home`} content="마이페이지" />
        <NavChild to={`/member/${myData!.id}/detail/gym`} content="헬스장 현황" />
        <NavChild to={`/member/${myData!.id}/edit/gym`} content="헬스장 관리" />
      </ul>
    </aside>
  );
};

export default MemberSidebar;
