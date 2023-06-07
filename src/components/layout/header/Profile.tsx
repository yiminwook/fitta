import header from '@/components/layout/header/Header.module.scss';
import { useUser } from '@/hooks/useUser';
import gravatar from 'gravatar';
import { MouseEvent, useState } from 'react';
import ToggleMenu from '@/components/layout/header/ToggleMenu';

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  const { data: myData } = useUser();
  const [toggleShow, setToggleShow] = useState(false);

  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setToggleShow((pre) => !pre);
  };

  const closeToggle = () => {
    setToggleShow(() => false);
  };

  return (
    <>
      <div className={header['profile']} onClick={handleToggle}>
        <div className={header['profileImageWapper']}>
          <img src={gravatar.url(myData!.name, { s: '30px', d: 'retro' })} alt="user-profile-image" />
        </div>
        <p>{myData!.name}</p>
        {toggleShow ? <ToggleMenu onClose={closeToggle} /> : null}
      </div>
    </>
  );
};

export default Profile;
