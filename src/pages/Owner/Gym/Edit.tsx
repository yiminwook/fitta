import GymEditForm from '@/components/owner/gym/GymEditForm';
import PostModal from '@/components/signUp/PostModal';
import usePostModal from '@/hooks/usePostModal';

interface OwnerGymEditProps {}

const OwnerGymEdit = ({}: OwnerGymEditProps) => {
  const { showPostModal, openPostModal, closePostModal, handleRoadAddress, roadAddress } = usePostModal();
  return (
    <>
      <GymEditForm openPostModal={openPostModal} roadAddress={roadAddress} />
      {showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}
    </>
  );
};

export default OwnerGymEdit;
