import StaffEditForm from '@/components/owner/staff/StaffEditForm';
import PostModal from '@/components/signUp/PostModal';
import usePostModal from '@/hooks/usePostModal';
import owner from '@/components/owner/Owner.module.scss';

interface OwnerEditStaffProps {}

const OwnerEditStaff = ({}: OwnerEditStaffProps) => {
  const { showPostModal, openPostModal, closePostModal, handleRoadAddress, roadAddress } = usePostModal();
  return (
    <section className={owner['staffEditForm']}>
      <h1>스태프를 등록해주세요</h1>
      <StaffEditForm openPostModal={openPostModal} roadAddress={roadAddress} />
      {showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}
    </section>
  );
};

export default OwnerEditStaff;
