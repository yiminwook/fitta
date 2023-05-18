import signUpForm from '@/components/signup/SignUpForm.module.scss';
import { MemberFormElements, MemberFormProps } from '@/components/signup/MemberForm';
import { FormEvent, useRef } from 'react';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import SearchButton from '@/components/common/SeachButton';
import PasswordInput from '@/components/common/PasswordInput';
import Loading from '@/components/common/Loading';

interface OwnerFormElements extends Omit<MemberFormElements, 'occupation'> {}

interface OwnerForm extends HTMLFormElement {
  readonly elements: OwnerFormElements;
}

export interface OwnerFormProps extends MemberFormProps {}

const OwnerForm = ({ sendSignUpData, openPostModal, roadAddress }: OwnerFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<OwnerForm>) => {
    e.preventDefault();
    if (!e.currentTarget) return;
    const { password, passwordCheck, name, birthDate, sex, addressDetail } = e.currentTarget.elements;

    const passwordValue = password.value;
    const passswordCheckValue = passwordCheck.value;
    const nameValue = name.value;
    const birthDateValue = birthDate.value;
    const sexValue = sex.value;
    const address = (roadAddress + addressDetail.value).trim();

    sendSignUpData('');
  };

  if (isLoading) {
    return <Loading style={{ height: '42.5rem' }} />;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className={signUpForm['form']}>
      <label htmlFor="email">이메일</label>
      <input className={signUpForm['email']} name="email" type="email" value={userData?.email} readOnly tabIndex={-1} />
      <PasswordInput passwordName="password" passwordCheckName="passwordCheck" />
      <label htmlFor="name">이름</label>
      <input name="name" type="text" />
      {/* address */}
      <label htmlFor="address">주소</label>
      <div className={signUpForm['address']}>
        <input
          name="address"
          type="text"
          placeholder="도로명주소"
          value={roadAddress}
          readOnly
          onFocus={openPostModal}
        />
        <SearchButton onClick={openPostModal} size="1.5rem" />
      </div>
      <label htmlFor="addressDetail">상세주소</label>
      <input name="addressDetail" type="text" placeholder="상세주소" />
      {/* ageSex */}
      <div className={signUpForm['birthDateSex']}>
        <label htmlFor="birthDate">생년월일</label>
        <input name="birthDate" type="date" />
        <label htmlFor="sex">성별</label>
        <select name="sex">
          <option value="">선택</option>
          <option value="man">남성</option>
          <option value="woman">여성</option>
        </select>
      </div>
      {/* footer */}
      <div className={signUpForm['footer']}>
        <button type="submit">제출</button>
      </div>
    </form>
  );
};

export default OwnerForm;
