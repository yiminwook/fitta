import { useOwner, useUser } from '@/hooks/useAPI';
import { createDefaultProfileImage } from '@/utils/createDefaultProfileImage';
import owner from '@/components/owner/Owner.module.scss';

const OwnerProfileSection = () => {
  const { myData } = useUser();
  const { ownerMyData } = useOwner();

  if (!(myData && ownerMyData)) {
    return null;
  }

  const { name, role, profileImage } = myData;
  const { phoneNumber, email } = ownerMyData;

  return (
    <section className={owner['profileSection']}>
      <div>
        <img src={createDefaultProfileImage({ key: name, size: '100px' })} alt="user-profile-image" />
      </div>
      <ul>
        <li>{name}</li>
        <li>{email}</li>
        <li>{phoneNumber}</li>
      </ul>
      <div>
        <button>+ 내정보 수정하기</button>
      </div>
    </section>
  );
};

export default OwnerProfileSection;
