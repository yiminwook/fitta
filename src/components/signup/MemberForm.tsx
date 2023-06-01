import { FormEvent, useEffect, useRef } from 'react';
import signUpForm from '@/components/signup/SignUpForm.module.scss';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import SearchButton from '@/components/common/SeachButton';
import PasswordInput from '@/components/common/PasswordInput';
import { MemberData, OwnerData } from '@/types/userData';
import Loading from '@/components/common/Loading';

export interface MemberFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  passwordCheck: HTMLInputElement;
  name: HTMLInputElement;
  birthDate: HTMLInputElement;
  occupation: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  sex: HTMLSelectElement;
}

interface MemberForm extends HTMLFormElement {
  readonly elements: MemberFormElements;
}

export interface MemberFormProps {
  sendSignUpData: ({ data, isOwner }: { data: MemberData | OwnerData; isOwner: boolean }) => void;
  openPostModal: () => void;
  roadAddress: string;
}

const MemberForm = ({ sendSignUpData, openPostModal, roadAddress }: MemberFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<MemberForm>) => {
    e.preventDefault();
    if (!e.currentTarget) return;
    const { email, name, birthDate, sex, occupation, addressDetail, password, passwordCheck } =
      e.currentTarget.elements;

    const emailValue = email.value;
    const passwordValue = password.value;
    const passswordCheckValue = passwordCheck.value;
    const nameValue = name.value;
    const birthDateValue = birthDate.value;
    const sexValue = sex.value;
    const occupationValue = occupation.value;
    const address = (roadAddress + ' ' + addressDetail.value).trim();

    sendSignUpData({
      isOwner: false,
      data: {
        email: emailValue,
        password: passwordValue,
        passwordConfirm: passswordCheckValue, //제거 예정
        name: nameValue,
        address,
        gender: sexValue,
        phoneNumber: '010123445634',
        birthDate: birthDateValue,
        occupation: occupationValue,
      },
    });
  };

  // useEffect(() => {
  //   if (isLoading === false && !userData?.email) {
  //     navigate('/signin');
  //   }
  // }, [isLoading, userData]);

  if (isLoading) {
    return <Loading style={{ height: '42.5rem' }} />;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className={signUpForm['form']}>
      <label htmlFor="email" className={signUpForm['email']}>
        이메일
      </label>
      <input name="email" type="email" value={userData?.email} tabIndex={-1} />
      <PasswordInput passwordName="password" passwordCheckName="passwordCheck" />
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

export default MemberForm;
