import { useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';

interface OwnerDetailStaffProps {}

const OwnerDetailStaff = ({}: OwnerDetailStaffProps) => {
  const { myData } = useUser();

  if (!myData) return null;
  const { id, role } = myData;
  return (
    <>
      OwnerDetailStaff
      <div>
        <Link to={`/${role}/${id}/staff/new/edit`}>스태프 추가</Link>
      </div>
    </>
  );
};

export default OwnerDetailStaff;
