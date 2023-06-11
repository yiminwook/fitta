import PostModal from '@/components/signUp/PostModal';
import usePostModal from '@/hooks/usePostModal';

interface MemberEditGymProps {}

const MemberEditGym = ({}: MemberEditGymProps) => {
  const { showPostModal, openPostModal, closePostModal, handleRoadAddress, roadAddress } = usePostModal();
  return <>{showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}</>;
};

export default MemberEditGym;
