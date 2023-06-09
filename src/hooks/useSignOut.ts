import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/useAPI';
import { handleToastError } from '@/utils/handleToast';

export const useSignOut = () => {
  const navigate = useNavigate();
  const { refetchMyData } = useUser();

  const signOut = async () => {
    try {
      const responese = await axios.post('/signout');
      if (responese.status === 200) {
        navigate('/');
        toast.success('로그아웃 성공');
        refetchMyData();
      }
    } catch (error) {
      handleToastError(error);
    }
  };

  return { signOut };
};
