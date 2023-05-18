import { CSSProperties, memo } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';

interface SpeechBubbleProps {
  className: string;
  message: string;
  style?: CSSProperties;
  iconColor: string;
  onClose: () => void;
}

const SpeechBubble = ({ className, message, style, iconColor, onClose }: SpeechBubbleProps) => {
  return (
    <div className={className} style={{ ...style }}>
      <span>
        <FiAlertCircle size="1.5rem" color={iconColor} />
      </span>
      <p>{message}</p>
      <div>
        <button onClick={onClose}>
          <CgClose color={'inherit'} size={'1rem'} />
        </button>
      </div>
    </div>
  );
};

export default memo(SpeechBubble);
