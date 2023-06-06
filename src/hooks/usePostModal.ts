import { useState } from 'react';
import { Address } from 'react-daum-postcode';

const usePostModal = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [roadAddress, setRoadAddress] = useState('');

  const handleRoadAddress = (address: Address) => {
    setRoadAddress(() => address.roadAddress);
    closePostModal();
  };

  const openPostModal = () => {
    setShowPostModal(() => true);
  };

  const closePostModal = () => {
    setShowPostModal(() => false);
  };

  return {
    showPostModal,
    setShowPostModal,
    roadAddress,
    setRoadAddress,
    handleRoadAddress,
    openPostModal,
    closePostModal,
  };
};

export default usePostModal;
