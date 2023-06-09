import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/useUser';
import { handleToastError } from '@/utils/handleToast';

export const useSignOut = () => {
  const navigate = useNavigate();
  const { refetch: myDataRefetch } = useUser();

  const signOut = async () => {
    try {
      const responese = await axios.post('/signout');
      if (responese.status === 200) {
        navigate('/');
        toast.success('로그아웃 성공');
        myDataRefetch();
      }
    } catch (error) {
      handleToastError(error);
    }
  };

  return { signOut };
};
