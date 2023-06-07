import { Navigate, Route, Routes } from 'react-router-dom';
import NavSection from '@/components/signUp/NavSection';
import PostModal from '@/components/signUp/PostModal';
import { SignUpMemberDataType, SignUpOwnerDataType } from '@/types/fittaApi';
import OwnerSection from '@/components/signUp/OwnerSection';
import MemberSection from '@/components/signUp/MemberSection';
import axios from 'axios';
import { handleToastError } from '@/utils/handleToast';
import usePostModal from '@/hooks/usePostModal';

const SignUp = () => {
  const { showPostModal, openPostModal, closePostModal, handleRoadAddress, roadAddress } = usePostModal();

  const sendSignUpData = async ({
    data,
    isOwner,
  }: {
    data: SignUpMemberDataType | SignUpOwnerDataType;
    isOwner: boolean;
  }) => {
    try {
      const parsedPhoneNumber = data.phoneNumber.split('-').join('');
      const signUpApi = isOwner ? `/owners` : `/members`;
      await axios.post(signUpApi, { ...data, phoneNumber: parsedPhoneNumber });
    } catch (error) {
      handleToastError(error);
    }
  };

  return (
    <>
      <NavSection />
      <Routes>
        <Route path="/" element={<Navigate to="/signup/member" replace />} />
        <Route
          path="/member"
          element={
            <MemberSection openPostModal={openPostModal} roadAddress={roadAddress} sendSignUpData={sendSignUpData} />
          }
        />
        <Route
          path="/owner"
          element={
            <OwnerSection openPostModal={openPostModal} roadAddress={roadAddress} sendSignUpData={sendSignUpData} />
          }
        />
      </Routes>
      {showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}
    </>
  );
};

export default SignUp;
