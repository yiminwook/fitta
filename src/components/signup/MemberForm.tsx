import { FormProps } from '@/pages/SignUp';
import { FormEvent, useRef } from 'react';
import signUpForm from '@/components/signup/SignUpForm.module.scss';

interface MemberFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  age: HTMLInputElement; //value: string;
  occupation: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  sex: HTMLSelectElement;
}

interface MemberForm extends HTMLFormElement {
  readonly elements: MemberFormElements;
}

const MemberForm = ({ sendSignUpData, openPostModal, roadAddress }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent<MemberForm>) => {
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
      <input name="email" type="email" value="example@gmail.com" readOnly />

      <label htmlFor="name">이름</label>
      <input name="name" type="text" />

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
      <label htmlFor="occupation">직업</label>
      <input name="occupation" type="text" />

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
        <button type="button" onClick={openPostModal}>
          주소검색
        </button>
      </div>
      <label htmlFor="addressDetail">상세주소</label>
      <input name="addressDetail" type="text" placeholder="상세주소" />
      <div className={signUpForm['footer']}>
        <button type="submit">제출</button>
      </div>
    </form>
  );
};

export default MemberForm;
