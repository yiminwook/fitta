import { useUser } from '@/hooks/useAPI';
import profile from '@/components/layout/header/Profile.module.scss';
import { createDefaultProfileImage } from '@/utils/createDefaultProfileImage';
import { useSignOut } from '@/hooks/useAPI';
import MyPageLink from '@/components/common/link/MyPageLink';

interface MenuProfileProps {}

const MenuProfile = ({}: MenuProfileProps) => {
  const { myData } = useUser();
  const { signOut } = useSignOut();

  return (
    <div className={profile['menuProfile']}>
      <div>
        <MyPageLink>
          <img src={createDefaultProfileImage({ key: myData!.name, size: '50px' })} alt="user-profile-image" />
        </MyPageLink>
      </div>
      <MyPageLink>
        <p>{myData?.name}</p>
      </MyPageLink>
      <footer>
        <button onClick={signOut}>로그아웃</button>
      </footer>
    </div>
  );
};

export default MenuProfile;
