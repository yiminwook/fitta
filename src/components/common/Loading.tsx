import { CSSProperties } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import loading from '@/components/common/Loading.module.scss';

interface LoadingProps {
  style?: CSSProperties;
  size?: string;
  className?: string;
}

/** style로 width랑 height를 조절 */
const Loading = ({ style, size = '3rem', className = '' }: LoadingProps) => {
  return (
    <div style={{ ...style }} className={[loading['loading'], className].join(' ')}>
      <div>
        <AiOutlineLoading3Quarters size={size} color="inherit" />
      </div>
    </div>
  );
};

export default Loading;
