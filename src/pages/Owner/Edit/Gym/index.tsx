import GymEditForm from '@/components/owner/detail/GymEditForm';
import PostModal from '@/components/signUp/PostModal';
import usePostModal from '@/hooks/usePostModal';

interface OwnerEditGymProps {}

const OwnerEditGym = ({}: OwnerEditGymProps) => {
  const { showPostModal, openPostModal, closePostModal, handleRoadAddress, roadAddress } = usePostModal();
  return (
    <>
      <GymEditForm openPostModal={openPostModal} roadAddress={roadAddress} />
      {showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}
    </>
  );
};

export default OwnerEditGym;
