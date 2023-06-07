import { useEffect } from 'react';

/**
 * useEffect로 document에 onClose clickEvent 추가
 *
 * 외부 클릭시 닫는기능
 */
const useCloseEventListener = (onClose: () => void) => {
  useEffect(() => {
    document.addEventListener('click', onClose);
    return () => document.removeEventListener('click', onClose);
  }, []);
};

export default useCloseEventListener;
