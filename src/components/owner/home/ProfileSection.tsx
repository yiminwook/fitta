import { useOwner, useUser } from '@/hooks/useAPI';
import { createDefaultProfileImage } from '@/utils/createDefaultProfileImage';
import ownerHome from '@/components/owner/home/Home.module.scss';
import { Link } from 'react-router-dom';

const OwnerProfileSection = () => {
  const { myData } = useUser();
  const { ownerMyData } = useOwner();

  if (!(myData && ownerMyData)) {
    return null;
  }

  const { name, role, profileImage } = myData;
  const { phoneNumber, email } = ownerMyData;

  return (
    <section className={ownerHome['profileSection']}>
      <div>
        <img src={createDefaultProfileImage({ key: name, size: '100px' })} alt="user-profile-image" />
      </div>
      <ul>
        <li>{name}</li>
        <li>{email}</li>
        <li>{phoneNumber}</li>
      </ul>
      <Link to={`/owner/${myData.id}/home`}>+ 내정보 수정하기</Link>
    </section>
  );
};

export default OwnerProfileSection;
