import { Route, Routes } from 'react-router-dom';
import UserSection from '@/components/signup/UserSection';
import OwnerSection from '@/components/signup/OwnerSection';

const SignUp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserSection />} />
        <Route path="/owner" element={<OwnerSection />} />
      </Routes>
    </>
  );
};

export default SignUp;
