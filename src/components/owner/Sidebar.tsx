import NavChild from '@/components/common/NavChild';
import owner from '@/components/owner/Owner.module.scss';
import { useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';
import Accordion from '@/components/common/accordion/Accordion';

const OwnerSidebar = () => {
  const { myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <aside className={owner['sidebar']}>
      <h1 className="blind">오너 사이드바</h1>
      <Link to={`/owner/${myData!.id}/home`}>마이페이지(오너)</Link>
      <Accordion title="헬스장">
        <ul>
          <NavChild to={`/owner/${myData!.id}/gym`} content="헬스장 현황" />
        </ul>
      </Accordion>
      <Accordion title="스태프">
        <ul>
          <NavChild to={`/owner/${myData!.id}/staff`} content="스태프 현황" />
          <NavChild to={`/owner/${myData!.id}/staff/edit`} content="스태프 관리" />
        </ul>
      </Accordion>
      <Accordion title="멤버">
        <ul>
          <NavChild to={`/owner/${myData!.id}/member`} content="멤버 현황" />
          <NavChild to={`/owner/${myData!.id}/member/edit`} content="멤버 관리" />
        </ul>
      </Accordion>
    </aside>
  );
};

export default OwnerSidebar;
