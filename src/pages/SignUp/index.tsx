import { Navigate, Route, Routes } from 'react-router-dom';
import UserSection from '@/components/signup/UserSection';
import OwnerSection from '@/components/signup/OwnerSection';
import NavSection from '@/components/signup/NavSection';

const SignUp = () => {
  return (
    <>
      <NavSection />
      <Routes>
        <Route path="/" element={<Navigate to="/signup/member" replace />} />
        <Route path="/member" element={<UserSection />} />
        <Route path="/owner" element={<OwnerSection />} />
      </Routes>
    </>
  );
};

export default SignUp;
