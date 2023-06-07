import useCloseEventListener from '@/hooks/useCloseEventListener';
import { CSSProperties, memo, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface SpeechBubbleProps {
  className: string;
  message: string;
  style?: CSSProperties;
  iconColor: string;
  onClose: () => void;
}

const SpeechBubble = ({ className, message, style, iconColor, onClose }: SpeechBubbleProps) => {
  useCloseEventListener(onClose);

  return (
    <div className={className} style={{ ...style }}>
      <span>
        <FiAlertCircle size="1.5rem" color={iconColor} />
      </span>
      <p>{message}</p>
    </div>
  );
};

export default memo(SpeechBubble);
