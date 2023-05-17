import OwnerForm from '@/components/signup/OwnerForm';
import signup from '@/components/signup/SignUp.module.scss';
import { FormProps } from '@/pages/SignUp';

interface OwnderSectionProps extends FormProps {}

const OwnerSection = ({ sendSignUpData, openPostModal, roadAddress }: OwnderSectionProps) => {
  return (
    <section className={signup['ownerSection']}>
      <h1>사업자 회원가입</h1>
      <OwnerForm sendSignUpData={sendSignUpData} openPostModal={openPostModal} roadAddress={roadAddress} />
    </section>
  );
};

export default OwnerSection;
