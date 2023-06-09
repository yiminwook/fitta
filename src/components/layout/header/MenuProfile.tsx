import { useUser } from '@/hooks/useAPI';
import profile from '@/components/layout/header/Profile.module.scss';
import { createDefaultProfileImage } from '@/utils/createDefaultProfileImage';
import { useSignOut } from '@/hooks/useSignOut';

interface MenuProfileProps {}

const MenuProfile = ({}: MenuProfileProps) => {
  const { myData } = useUser();
  const { signOut } = useSignOut();
  return (
    <div className={profile['menuProfile']}>
      <div>
        <img src={createDefaultProfileImage({ key: myData!.name, size: '50px' })} alt="user-profile-image" />
      </div>
      <p>{myData?.name}</p>
      <footer>
        <button onClick={signOut}>로그아웃</button>
      </footer>
    </div>
  );
};

export default MenuProfile;
