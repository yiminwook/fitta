import NavChild from '@/components/common/NavChild';
import toggleMenu from '@/components/layout/header/ToggleMenu.module.scss';
import { useUser } from '@/hooks/useUser';
import { MouseEvent, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import MenuProfile from '@/components/layout/header/MenuProfile';

interface ToggleMenuProps {
  onClose: () => void;
}

const ToggleMenu = ({ onClose }: ToggleMenuProps) => {
  const { data: myData } = useUser();

  const onClick = (e: MouseEvent | globalThis.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const body = document.querySelector('body')! as HTMLBodyElement;
    body.addEventListener('click', onClick);

    return () => body.removeEventListener('click', onClick);
  }, []);

  const renderMyPageLink = () => {
    if (!myData) return null;
    const { role, id } = myData;
    return <NavChild to={`${role.toLocaleLowerCase()}/${id}/home`} content="마이페이지" />;
  };

  return (
    <div className={toggleMenu['toggleMenu']}>
      <header>
        <button>
          <CgClose color="inherit" size="1rem" />
        </button>
      </header>
      {myData ? <MenuProfile /> : null}
      <ul>
        {/* pageLink 임시 */}
        {renderMyPageLink()}
      </ul>
    </div>
  );
};

export default ToggleMenu;
