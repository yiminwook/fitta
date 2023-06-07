import { FormEvent, useEffect, useRef } from 'react';
import signUpForm from '@/components/signUp/SignUpForm.module.scss';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import SearchButton from '@/components/common/SeachButton';
import PasswordInput from '@/components/common/PasswordInput';
import { SignUpMemberDataType, SignUpOwnerDataType } from '@/types/fittaApi';
import Loading from '@/components/common/Loading';
import NumberInput from '@/components/common/NumberInput';
import { toast } from 'react-toastify';
import { formElementValueCheck, formPasswordCheck } from '@/utils/formElementValueCheck';

export interface MemberFormElementsType extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  passwordConfirm: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  name: HTMLInputElement;
  birthdate: HTMLInputElement;
  occupation: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  gender: HTMLSelectElement;
}

interface MemberFormType extends HTMLFormElement {
  readonly elements: MemberFormElementsType;
}

export interface MemberFormProps {
  sendSignUpData: ({ data, isOwner }: { data: SignUpMemberDataType | SignUpOwnerDataType; isOwner: boolean }) => void;
  openPostModal: () => void;
  roadAddress: string;
}

const MemberForm = ({ sendSignUpData, openPostModal, roadAddress }: MemberFormProps) => {
  const memberFormRef = useRef<MemberFormType>(null);
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<MemberFormType>) => {
    try {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      if (!currentTarget) return;

      const { email, name, phoneNumber, birthdate, gender, occupation, addressDetail, password, passwordConfirm } =
        currentTarget.elements;

      formPasswordCheck({ currentTarget, password: password.value, passwordConfirm: passwordConfirm.value });

      const address = (roadAddress + ' ' + addressDetail.value).trim();

      const data: SignUpMemberDataType = {
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value, //삭제 예정
        name: name.value,
        phoneNumber: phoneNumber.value,
        address,
        gender: gender.value,
        birthdate: birthdate.value,
        occupation: occupation.value,
      };

      formElementValueCheck<MemberFormType, SignUpMemberDataType>({ currentTarget, data });
      sendSignUpData({
        isOwner: false,
        data,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
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
    <form ref={memberFormRef} onSubmit={onSubmit} className={signUpForm['form']}>
      {/* email readOnly */}
      <label htmlFor="email" className={signUpForm['email']}>
        이메일
      </label>
      <input name="email" type="email" tabIndex={-1} />
      <PasswordInput passwordName="password" passwordConfirmName="passwordConfirm" />
      {/* name phone */}
      <label htmlFor="name">이름</label>
      <input name="name" type="text" />
      <label htmlFor="phoneNumber">연락처</label>
      <NumberInput name="phoneNumber" maxLength={11} pattern={/(^\d{2,3})(\d{4})(\d{4}$)/} />
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
      {/* birthDate gender */}
      <div className={signUpForm['birthdateGender']}>
        <label htmlFor="birthdate">생년월일</label>
        <input name="birthdate" type="date" />
        <label htmlFor="gender">성별</label>
        <select name="gender">
          <option value="">선택</option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
      </div>
      {/* footer */}
      <div className={signUpForm['footer']}>
        <p>모든 항목은 필수입니다.</p>
        <button type="submit">제출</button>
      </div>
    </form>
  );
};

export default MemberForm;
