import { Navigate, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('@/pages/Home'));
const SignInPage = loadable(() => import('@/pages/SignIn'));
const SignUpPage = loadable(() => import('@/pages/SignUp'));
const SeachPage = loadable(() => import('@/pages/Search'));
const GymPage = loadable(() => import('@/pages/Gym'));
const OwenerPage = loadable(() => import('@/pages/Owner'));
const NotFoundPage = loadable(() => import('@/pages/404'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/search" element={<SeachPage />} />
        <Route path="/gym/:gymId" element={<GymPage />} />
        <Route path="/owner/:ownerId/*" element={<OwenerPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
