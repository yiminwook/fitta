import { CSSProperties, MouseEvent, ReactNode } from 'react';
import layout from '@/components/layout/Layout.module.scss';
import { CgClose } from 'react-icons/cg';
import useStopPropagation from '@/hooks/useStopPropagation';

interface ModalProps {
  children: ReactNode;
  style?: CSSProperties;
  onClose: (e: MouseEvent) => void;
}
const Modal = ({ children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();
  return (
    <div className={layout['modal']} onClick={onClose}>
      <div style={style} onClick={stopPropagation}>
        <button className={layout['close']} onClick={onClose}>
          <CgClose color={'inherit'} size={'2rem'} />
        </button>
        <div className={layout['inner']}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
