import Loading from '@/components/common/loading/Loading';
import { useOwner } from '@/hooks/useAPI';
import { StaffType } from '@/types/fittaApi';
import { MouseEvent } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, useParams } from 'react-router-dom';

interface StaffListProps {
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
  staffs: StaffType[];
}

const StaffList = ({ onClick, staffs }: StaffListProps) => {
  const { ownerId } = useParams<{ ownerId: string; gymId: string }>();
  const { isLoadingOwnerMyData } = useOwner();

  if (staffs.length === 0) {
    return (
      <div>
        {isLoadingOwnerMyData ? (
          <Loading style={{ height: '10rem' }} />
        ) : (
          <>
            <h2>헬스장에 등록된 스태프가 없습니다.</h2>
            <footer>
              <Link to={`/owner/${ownerId}/staff/new/edit`}>스태프 추가하러가기</Link>
            </footer>
          </>
        )}
      </div>
    );
  }

  return (
    <Scrollbars autoHeight autoHeightMax={'20rem'}>
      <ul>
        {staffs.map(({ id, name }, index) => (
          <li key={`staff-modal-li-${id}`} onClick={onClick} value={index}>
            {name}
          </li>
        ))}
      </ul>
    </Scrollbars>
  );
};

export default StaffList;
