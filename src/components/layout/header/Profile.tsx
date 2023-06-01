import header from '@/components/layout/header/Header.module.scss';
import gravatar from 'gravatar';
import { MouseEvent, useState } from 'react';
import ToggleMenu from './ToggleMenu';

interface ProfileProps {
  userData: any;
}

const Profile = ({ userData }: ProfileProps) => {
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
          <img src={gravatar.url(userData, { s: '30px', d: 'retro' })} alt="user-profile-image" />
        </div>
        <p>홍길동</p>
        {toggleShow ? <ToggleMenu onClose={closeToggle} /> : null}
      </div>
    </>
  );
};

export default Profile;
