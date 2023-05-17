import { FormProps } from '@/pages/SignUp';
import signUpForm from '@/components/signup/SignUpForm.module.scss';
import { MemberFormElements } from '@/components/signup/MemberForm';
import { FormEvent, useRef } from 'react';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import SearchButton from '@/components/common/SeachButton';

interface OwnerFormElements extends MemberFormElements {}

interface OwnerForm extends HTMLFormElement {
  readonly elements: OwnerFormElements;
}

const OwnerForm = ({ sendSignUpData, openPostModal, roadAddress }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<OwnerForm>) => {
    e.preventDefault();
    if (!e.currentTarget) return;
    const { name, age, sex, occupation, addressDetail } = e.currentTarget.elements;
    const nameValue = name.value;
    const ageValue = age.value;
    const sexValue = sex.value;
    const occupationValue = occupation.value;
    const address = (roadAddress + addressDetail.value).trim();

    sendSignUpData('');
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className={signUpForm['form']}>
      <label htmlFor="email">이메일</label>
      <input name="email" type="email" value={userData?.email} readOnly />
      <label htmlFor="name">이름</label>
      <input name="name" type="text" />
      <label htmlFor="occupation">직업</label>
      <input name="occupation" type="text" />
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
      <label htmlFor="addressDetail">상세</label>
      <input name="addressDetail" type="text" placeholder="상세주소" />
      {/* ageSex */}
      <div className={signUpForm['ageSex']}>
        <label htmlFor="age">나이</label>
        <input name="age" type="number" />
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
