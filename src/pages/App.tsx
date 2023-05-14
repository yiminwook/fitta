import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import Admin from '@/pages/Admin';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
