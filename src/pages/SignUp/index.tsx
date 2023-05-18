import { Navigate, Route, Routes } from 'react-router-dom';
import NavSection from '@/components/signup/NavSection';
import { useState } from 'react';
import { Address } from 'react-daum-postcode';
import PostModal from '@/components/signup/PostModal';
import { MemberData, OwnerData } from '@/types/userData';
import OwnerSection from '@/components/signup/OwnerSection';
import MemberSection from '@/components/signup/MemberSection';
// import { useUser } from '@/hooks/useUser';

const SignUp = () => {
  const [roadAddress, setRoadAddress] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const sendSignUpData = async (data: MemberData | OwnerData) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

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
