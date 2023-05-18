import MemberForm, { MemberFormProps } from '@/components/signup/MemberForm';
import signup from '@/components/signup/SignUp.module.scss';

interface MemberSectionProps extends MemberFormProps {}

const MemberSection = ({ sendSignUpData, openPostModal, roadAddress }: MemberSectionProps) => {
  return (
    <section className={signup['memberSection']}>
      <h1>개인 회원가입</h1>
      <MemberForm sendSignUpData={sendSignUpData} openPostModal={openPostModal} roadAddress={roadAddress} />
    </section>
  );
};

export default MemberSection;
