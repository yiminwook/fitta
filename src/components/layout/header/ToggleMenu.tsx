import NavChild from '@/components/common/NavChild';
import header from '@/components/layout/header/Header.module.scss';
import useStopPropagation from '@/hooks/useStopPropagation';
import { MouseEvent, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

interface ToggleMenuProps {
  onClose: () => void;
  signOut: () => void;
}

const ToggleMenu = ({ onClose, signOut }: ToggleMenuProps) => {
  const { stopPropagation } = useStopPropagation();

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
    <div className={header['toggleMenu']} onClick={stopPropagation}>
      <header>
        <button onClick={onClick}>
          <CgClose color="inherit" size="1rem" />
        </button>
      </header>
      <ul>
        {/* pageLink 임시 */}
        <NavChild to="/search" content="검색" onClick={onClick} />
        <NavChild to="/admin" content="Admin" onClick={onClick} />
        <NavChild to="/signup" content="가입" onClick={onClick} />
      </ul>
      <footer>
        <button onClick={signOut}>로그아웃</button>
      </footer>
    </div>
  );
};

export default ToggleMenu;
