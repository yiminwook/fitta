import { FormEvent, useRef } from 'react';
import NumberInput from '@/components/common/NumberInput';
import { useParams } from 'react-router-dom';
import owner from '@/components/owner/Owner.module.scss';
import { handleToastError } from '@/utils/handleToast';
import { formElementValueCheck } from '@/utils/formElementValueCheck';
import axios from 'axios';
import { useOwner } from '@/hooks/useAPI';

interface GymEditFormProps {
  openPostModal: () => void;
  roadAddress: string;
}

interface GymEditFormFormElementsType extends HTMLFormControlsCollection {
  businessName: HTMLInputElement;
  businessNumber: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  genderDivision: HTMLSelectElement;
}

interface GymEditFormType extends HTMLFormElement {
  readonly elements: GymEditFormFormElementsType;
}

const GymEditForm = ({ openPostModal, roadAddress }: GymEditFormProps) => {
  const { ownerId } = useParams();
  const { refetchOwnerMydata } = useOwner();
  const gymEditFormRef = useRef<GymEditFormType>(null);

  const onSubmit = async (e: FormEvent<GymEditFormType>) => {
    e.preventDefault();
    const currentTarget = gymEditFormRef.current;
    if (!currentTarget) return;
    try {
      const { businessName, businessNumber, phoneNumber, addressDetail, genderDivision } =
        gymEditFormRef.current.elements;
      const address = (roadAddress + ' ' + addressDetail.value).trim();

      const data = {
        businessName: businessName.value,
        businessNumber: businessNumber.value,
        phoneNumber: phoneNumber.value,
        address,
        genderDivision: genderDivision.value,
      };

      formElementValueCheck<GymEditFormType, any>({ currentTarget, data });
      data.businessNumber = data.businessNumber.split('-').join('');
      data.phoneNumber = data.phoneNumber.split('-').join('');

      console.log('post data >>>', {
        name: data.businessName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        genderDivision: data.genderDivision,
        ownerId,
      });

      await axios.post('/gyms', {
        name: data.businessName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        genderDivision: data.genderDivision,
        ownerId,
        businessIdentificationNumber: data.businessNumber,
      });

      refetchOwnerMydata();
    } catch (error) {
      handleToastError(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className={owner['gymEditForm']} ref={gymEditFormRef}>
      <div>
        <label htmlFor="businessName">법인명(단체명)</label>
        <input name="businessName" type="text" placeholder="OO 피트니스" />
      </div>
      <div>
        <label htmlFor="businessNumber">사업자등록번호</label>
        <NumberInput
          name="businessNumber"
          maxLength={10}
          pattern={/(^\d{3})(\d{2})(\d{5}$)/}
          placeholder="OOO-XX-XXXXX"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">사업장연락처</label>
        <NumberInput name="phoneNumber" maxLength={11} pattern={/(^\d{2,3})(\d{4})(\d{4}$)/} />
      </div>
      <div>
        <label htmlFor="address">주소</label>
        <input
          name="address"
          type="text"
          placeholder="도로명주소"
          value={roadAddress}
          readOnly
          onFocus={openPostModal}
        />
      </div>
      <div>
        <label htmlFor="addressDetail">상세주소</label>
        <input name="addressDetail" type="text" placeholder="상세주소" />
      </div>
      <div>
        <div className={owner['genderDivision']}>
          <label htmlFor="genderDivision">여성전용 헬스장여부</label>
          <select name="genderDivision">
            <option value="">선택</option>
            <option value="UNISEX">공용</option>
            <option value="FEMALE_ONLY">여성전용</option>
            <option value="MALE_ONLY">남성전용</option>
          </select>
        </div>
      </div>
      <footer>
        <button type="submit">제출</button>
      </footer>
    </form>
  );
};

export default GymEditForm;
