import NavChild from '@/components/common/NavChild';
import member from '@/components/member/Member.module.scss';
import { useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';
import Accordion from '@/components/common/accordion/Accordion';

const MemberSidebar = () => {
  const { myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <aside className={member['sidebar']}>
      <h1 className="blind">멤버 사이드바</h1>
      <Link to={`/member/${myData!.id}/home`}>마이페이지(멤버)</Link>
      <Accordion title="헬스장">
        <ul>
          <NavChild to={`/member/${myData!.id}/gym`} content="헬스장 현황" />
        </ul>
      </Accordion>
    </aside>
  );
};

export default MemberSidebar;
