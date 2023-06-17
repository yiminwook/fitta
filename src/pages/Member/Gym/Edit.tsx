import PostModal from '@/components/signUp/PostModal';
import usePostModal from '@/hooks/usePostModal';

interface MemberGymEditProps {}

const MemberGymEdit = ({}: MemberGymEditProps) => {
  const { showPostModal, openPostModal, closePostModal, handleRoadAddress, roadAddress } = usePostModal();
  return <>{showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}</>;
};

export default MemberGymEdit;
