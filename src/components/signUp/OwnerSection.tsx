import signup from '@/components/signUp/SignUp.module.scss';
import OwnerForm, { OwnerFormProps } from '@/components/signUp/OwnerForm';

interface OwnderSectionProps extends OwnerFormProps {}

const OwnerSection = ({ sendSignUpData, openPostModal, roadAddress }: OwnderSectionProps) => {
  return (
    <section className={signup['ownerSection']}>
      <h1>사업자 회원가입</h1>
      <OwnerForm sendSignUpData={sendSignUpData} openPostModal={openPostModal} roadAddress={roadAddress} />
    </section>
  );
};

export default OwnerSection;
