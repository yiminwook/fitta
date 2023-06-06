import { Navigate, Route, Routes } from 'react-router-dom';
import NavSection from '@/components/signUp/NavSection';
import { useState } from 'react';
import { Address } from 'react-daum-postcode';
import PostModal from '@/components/signUp/PostModal';
import { SignUpMemberData, SignUpOwnerData } from '@/types/userData';
import OwnerSection from '@/components/signUp/OwnerSection';
import MemberSection from '@/components/signUp/MemberSection';
import axios from 'axios';
import { handleToastError } from '@/utils/handleToast';

const SignUp = () => {
  const [roadAddress, setRoadAddress] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const sendSignUpData = async ({ data, isOwner }: { data: SignUpMemberData | SignUpOwnerData; isOwner: boolean }) => {
    try {
      const parsedPhoneNumber = data.phoneNumber.split('-').join('');
      const signUpApi = isOwner ? `/owner` : `/members`;
      await axios.post(signUpApi, { ...data, phoneNumber: parsedPhoneNumber });
    } catch (error) {
      handleToastError(error);
    }
  };

  const handleRoadAddress = (address: Address) => {
    console.log(address);
    setRoadAddress(() => address.roadAddress);
    closePostModal();
  };

  const openPostModal = () => {
    setShowPostModal(() => true);
  };

  const closePostModal = () => {
    setShowPostModal(() => false);
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
