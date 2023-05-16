import DaumPostcode, { Address } from 'react-daum-postcode';
import Modal from '@/components/layout/Modal';

interface PostModalProps {
  onClose: () => void;
  onComplete: (address: Address) => void;
}

const PostModal = ({ onClose, onComplete }: PostModalProps) => {
  return (
    <Modal title="주소검색" onClose={onClose}>
      <DaumPostcode
        onComplete={onComplete} // 값을 선택할 경우 실행되는 이벤트
        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
      />
    </Modal>
  );
};

export default PostModal;
