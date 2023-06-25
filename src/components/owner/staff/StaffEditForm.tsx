import DragDrap from '@/components/common/dragDrop/DragDrop';
import NumberInput from '@/components/common/input/NumberInput';
import { FormEvent, useCallback, useRef, useState } from 'react';
import staff from '@/components/owner/staff/Staff.module.scss';
import axios from 'axios';
import { handleToastError } from '@/utils/handleToast';

export interface StaffFormElementsType extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  birthdate: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  gender: HTMLInputElement;
  teamId: HTMLInputElement;
  gymId: HTMLInputElement;
}

interface StaffFormType extends HTMLFormElement {
  readonly elements: StaffFormElementsType;
}

interface StaffEditFormProps {
  openPostModal: () => void;
  roadAddress: string;
}

const StaffEditForm = ({ openPostModal, roadAddress }: StaffEditFormProps) => {
  const formRef = useRef<StaffFormType>(null);
  const [profileImg, setProfileImg] = useState<File | null>(null);

  const handleProfileImg = useCallback((file: File) => {
    setProfileImg(() => file);
  }, []);

  const onSubmit = async (e: FormEvent<StaffFormType>) => {
    e.preventDefault();
    const currenTarget = e.currentTarget;
    if (!currenTarget) return;
    try {
      const { name, birthdate, gender, phoneNumber, address, teamId, gymId } = e.currentTarget.elements;
      // console.log(name.value, birthdate.value, gender.value, phoneNumber.value, address.value);
      await axios.post('/staffs', {
        name: name.value,
        birthdate: birthdate.value,
        gender: gender.value,
        phoneNumber: phoneNumber.value.split('-').join(''),
        address: address.value,
        //임시
        teamId: Number(teamId.value),
        gymId: Number(gymId.value),
      });
    } catch (error) {
      handleToastError(error);
    }
  };

  return (
    <form className={staff['editForm']} ref={formRef} onSubmit={onSubmit}>
      <header>
        <DragDrap
          className={staff['profile']}
          id="staff-profile-img"
          imgFile={profileImg}
          handleImgFile={handleProfileImg}
        />
      </header>
      <div>
        <label htmlFor="staff-name-input">이름</label>
        <input type="text" name="name" id="staff-name-input" />
      </div>
      <div>
        <label htmlFor="staff-birth-date-input">생년월일</label>
        <input id="staff-birth-date-input" name="birthdate" type="date" />
      </div>
      <div>
        <label htmlFor="staff-phone-number-input">연락처</label>
        <NumberInput name="phoneNumber" id="staff-phone-number-input" />
      </div>
      <div className={staff['gender']}>
        <p>성별</p>
        <div>
          <label htmlFor="staff-gender-male-radio">남성</label>
          <input type="radio" name="gender" id="staff-gender-male-radio" value="MALE" />
          <label htmlFor="staff-gender-female-radio">여성</label>
          <input type="radio" name="gender" id="staff-gender-female-radio" value="FEMAIL" />
        </div>
      </div>
      <div>
        <label htmlFor="staff-address-input">주소</label>
        <input
          id="staff-address-input"
          name="address"
          type="text"
          placeholder="도로명주소"
          value={roadAddress}
          readOnly
          onFocus={openPostModal}
        />
      </div>
      <div>
        <label htmlFor="staff-address-detail-input">상세주소</label>
        <input id="staff-address-detail-input" name="addressDetail" type="text" placeholder="상세주소" />
      </div>
      <div>
        <label htmlFor="staff-team">팀선택</label>
        <input type="text" id="staff-team" name="teamId" />
      </div>
      <div>
        <label htmlFor="staff-gym">체육관선택</label>
        <input type="text" id="staff-gym" name="gymId" />
      </div>
      <footer>
        <button type="submit">제출</button>
      </footer>
    </form>
  );
};

export default StaffEditForm;
