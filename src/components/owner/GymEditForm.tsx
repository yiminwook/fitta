import { FormEvent, useRef } from 'react';
import NumberInput from '@/components/common/NumberInput';
import { useParams } from 'react-router-dom';
import owner from '@/components/owner/Owner.module.scss';
import { handleToastError } from '@/utils/handleToast';
import { formElementValueCheck } from '@/utils/formElementValueCheck';

interface GymEditFormProps {
  openPostModal: () => void;
  roadAddress: string;
}

interface GymEditFormFormElementsType extends HTMLFormControlsCollection {
  businessName: HTMLInputElement;
  businessNumber: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  genderDivision: HTMLInputElement;
}

interface GymEditFormType extends HTMLFormElement {
  readonly elements: GymEditFormFormElementsType;
}

const GymEditForm = ({ openPostModal, roadAddress }: GymEditFormProps) => {
  const { ownerId } = useParams();
  const gymEditFormRef = useRef<GymEditFormType>(null);

  const onSubmit = (e: FormEvent<GymEditFormType>) => {
    e.preventDefault();
    const currentTarget = gymEditFormRef.current;
    if (!currentTarget) return;
    try {
      const { businessName, businessNumber, addressDetail, genderDivision } = gymEditFormRef.current.elements;
      const address = (roadAddress + ' ' + addressDetail.value).trim();

      const data = {
        businessName: businessName.value,
        businessNumber: businessNumber.value,
        address,
        genderDivision: genderDivision.checked,
      };

      formElementValueCheck<GymEditFormType, any>({ currentTarget, data });
      console.log('ownerId >>>', ownerId);
      console.log('formData >>>', data);
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
        <NumberInput name="businessNumber" maxLength={10} pattern={/(^\d{3})(\d{2})(\d{5}$)/} />
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
          <input type="checkbox" name="genderDivision" />
        </div>
      </div>
      <footer>
        <button type="submit">제출</button>
      </footer>
    </form>
  );
};

export default GymEditForm;
