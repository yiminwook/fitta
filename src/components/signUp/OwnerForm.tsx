import signUpForm from '@/components/signUp/SignUpForm.module.scss';
import { MemberFormElementsType, MemberFormProps } from '@/components/signUp/MemberForm';
import { FormEvent, useRef } from 'react';
import { useUser } from '@/hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import SearchButton from '@/components/common/button/SeachButton';
import PasswordInput from '@/components/common/input/PasswordInput';
import Loading from '@/components/common/loading/Loading';
import NumberInput from '@/components/common/input/NumberInput';
import { SignUpOwnerDataType } from '@/types/fittaApi';
import { formElementValueCheck, formPasswordCheck } from '@/utils/formElementValueCheck';
import { handleToastError } from '@/utils/handleToast';

interface OwnerFormElements extends Omit<MemberFormElementsType, 'occupation'> {}

interface OwnerFormType extends HTMLFormElement {
  readonly elements: OwnerFormElements;
}

export interface OwnerFormProps extends MemberFormProps {}

const OwnerForm = ({ sendSignUpData, openPostModal, roadAddress }: OwnerFormProps) => {
  const ownerFormRef = useRef<OwnerFormType>(null);
  const { myData, isLoadingMyData } = useUser();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<OwnerFormType>) => {
    try {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      if (!e.currentTarget) return;

      const { email, password, passwordConfirm, name, phoneNumber, birthdate, gender, addressDetail } =
        e.currentTarget.elements;

      formPasswordCheck({ currentTarget, password: password.value, passwordConfirm: passwordConfirm.value });

      const address = (roadAddress + ' ' + addressDetail.value).trim();

      const data: SignUpOwnerDataType = {
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value, //삭제예정
        name: name.value,
        phoneNumber: phoneNumber.value,
        businessRegistrationNumber: 'string', //삭제예정
        birthdate: birthdate.value,
        gender: gender.value,
        address,
      };

      formElementValueCheck<OwnerFormType, typeof data>({ currentTarget: e.currentTarget, data });
      sendSignUpData({
        isOwner: true,
        data,
      });
    } catch (error) {
      handleToastError(error);
    }
  };

  // if (isLoadingMyData) {
  //   return <Loading style={{ height: '42.5rem' }} />;
  // }

  return (
    <form ref={ownerFormRef} onSubmit={onSubmit} className={signUpForm['form']}>
      {/* email readOnly */}
      <label htmlFor="email">이메일</label>
      <input className={signUpForm['email']} name="email" type="email" tabIndex={-1} />
      <PasswordInput passwordName="password" passwordConfirmName="passwordConfirm" />
      {/* name phone */}
      <label htmlFor="name">이름</label>
      <input name="name" type="text" />
      <label htmlFor="owner-phone-number-input">연락처</label>
      <NumberInput
        name="phoneNumber"
        id="owner-phone-number-input"
        maxLength={11}
        pattern={/(^\d{3})(\d{3,4})(\d{4}$)/}
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

export default OwnerForm;
