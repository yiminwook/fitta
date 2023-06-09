import profile from '@/components/layout/header/Profile.module.scss';
import { useUser } from '@/hooks/useAPI';
import { MouseEvent, useEffect, useState } from 'react';
import ToggleMenu from '@/components/layout/header/ToggleMenu';
import { createDefaultProfileImage } from '@/utils/createDefaultProfileImage';
import { useLocation } from 'react-router-dom';

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  const [toggleShow, setToggleShow] = useState(false);
  const { myData } = useUser();
  const { pathname } = useLocation();

  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setToggleShow((pre) => !pre);
  };

  const closeToggle = () => {
    setToggleShow(() => false);
  };

  useEffect(() => {
    closeToggle();
  }, [myData, pathname]);

  return (
    <>
      <div className={profile['profile']} onClick={handleToggle}>
        <div className={profile['profileImageWapper']}>
          <img src={createDefaultProfileImage({ key: myData!.name })} alt="user-profile-image" />
        </div>
        <p>{myData!.name}</p>
        {toggleShow ? <ToggleMenu onClose={closeToggle} /> : null}
      </div>
    </>
  );
};

export default Profile;
