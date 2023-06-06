import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const handleToastError = (error: unknown) => {
  console.error(error);
  if (error instanceof AxiosError) {
    return toast.error('통신에러');
  }
  if (error instanceof Error) {
    return toast.error(error.message);
  }
};
