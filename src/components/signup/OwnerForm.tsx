import { FormProps } from '@/pages/SignUp';

const OwnerForm = ({ sendSignUpData, openPostModal, roadAddress }: FormProps) => {
  return (
    <form>
      ownerForm
      <button type="button" onClick={openPostModal}>
        toggle
      </button>
    </form>
  );
};

export default OwnerForm;
