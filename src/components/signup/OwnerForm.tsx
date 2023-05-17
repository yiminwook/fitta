import { FormProps } from '@/pages/SignUp';
import signUpForm from '@/components/signup/SignUpForm.module.scss';
import { MemberFormElements } from '@/components/signup/MemberForm';
import { FormEvent, useRef } from 'react';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import SearchButton from '@/components/common/SeachButton';
import NumberInput from '@/components/common/NumberInput';

interface OwnerFormElements extends Omit<MemberFormElements, 'occupation'> {
  businessRegistrationNumber: HTMLInputElement;
}

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
    const { name, age, sex, addressDetail, businessRegistrationNumber } = e.currentTarget.elements;
    const nameValue = name.value;
    const ageValue = age.value;
    const sexValue = sex.value;
    const businessRegistrationNumberValue = businessRegistrationNumber.value;
    console.log(businessRegistrationNumberValue);
    const address = (roadAddress + addressDetail.value).trim();

    sendSignUpData('');
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className={signUpForm['form']}>
      <label htmlFor="email">이메일</label>
      <input className={signUpForm['email']} name="email" type="email" value={userData?.email} readOnly tabIndex={-1} />
      <label htmlFor="name">이름</label>
      <input name="name" type="text" />
      <label htmlFor="occupation">사업자명</label>
      <input name="occupation" type="text" />
      <label htmlFor="businessRegistrationNumber">사업자번호</label>
      <NumberInput
        name="businessRegistrationNumber"
        pattern={/^(\d{3})(\d{2})(\d{5})$/}
        maxLength={10}
        placeholder="사업자등록번호 10자리"
      />
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
