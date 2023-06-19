import toggleMenu from '@/components/layout/header/ToggleMenu.module.scss';
import { useUser } from '@/hooks/useAPI';
import { MouseEvent, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import MenuProfile from '@/components/layout/header/MenuProfile';
import MyPageLink from '@/components/common/MyPageLink';

interface ToggleMenuProps {
  onClose: () => void;
}

const ToggleMenu = ({ onClose }: ToggleMenuProps) => {
  const { myData } = useUser();

  const onClick = (e: MouseEvent | globalThis.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const body = document.querySelector('body')! as HTMLBodyElement;
    body.addEventListener('click', onClick);

    return () => body.removeEventListener('click', onClick);
  }, []);

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
        <MyPageLink>마이페이지</MyPageLink>
      </ul>
    </div>
  );
};

export default ToggleMenu;
