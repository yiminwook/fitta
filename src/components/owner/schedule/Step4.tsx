/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import StaffModal from '@/components/owner/schedule/StaffModal';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import { StaffType } from '@/types/fittaApi';
import { useOwner } from '@/hooks/useAPI';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useInput } from '@/hooks/useInput';

const Step4 = () => {
  const initialStaff = useSelector((state) => state.schedule.staff);
  const initialPrice = useSelector((state) => state.schedule.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  const initialStartTime = useSelector((state) => state.schedule.startTime);
  const initialEndTime = useSelector((state) => state.schedule.endTime);

  const [staff, setStaff] = useState<null | StaffType>(initialStaff);
  const [price, setPrice] = useState(initialPrice);
  const [startTime, _setStartTime, onChangeStartTime] = useInput(initialStartTime);
  const [endTime, _setEndTime, onChangeEndTime] = useInput(initialEndTime);
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);
  const { ownerMyData } = useOwner();
  const { gymId } = useParams<{ ownerId: string; gymId: string }>();

  const dispatch = useDispatch();

  const openStaffModal = useCallback(() => {
    setShowStaffModal(() => true);
  }, []);

  const closeStaffModal = useCallback(() => {
    setShowStaffModal(() => false);
  }, []);

  const onChangePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numberValue = value.replace(/[^0-9]/g, '');
      const priceValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setPrice(() => priceValue);
    },
    [price],
  );

  const handlePrevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const handleNextStep = useCallback(() => {
    if (staff === null || staff.id === undefined || !price.trim() || startTime.length < 5 || endTime.length < 5) {
      toast.warning('입력되지않은 정보가 있습니다.');
      return;
    }
    dispatch(scheduleSlice.actions.setStaffAndPriceAndTime({ staff, price, startTime, endTime }));
    dispatch(scheduleSlice.actions.nextStep());
  }, [staff, price, startTime, endTime]);

  const staffs = useMemo(() => {
    const gym = ownerMyData?.gymList.find((gym) => gym.id === Number(gymId));
    return gym && gym.staffs.length > 0 ? gym.staffs.slice() : [];
  }, [ownerMyData?.id, gymId]);

  return (
    <section className={schedule['step4']}>
      <h2>Step4. 담당 트레이너와 금액을 선택해주세요</h2>
      <div className={schedule['staff']}>
        <div>
          <label id="schedule-staff">트레이너</label>
          <button id="schedule-staff" onClick={openStaffModal}>
            선택
          </button>
        </div>
        <div>{staff !== null ? `${staff.name}` : '트레이너를 선택해주세요'}</div>
      </div>

      <div className={schedule['interface']}>
        <div>
          <label htmlFor="schedule-startTime">시작시간</label>
          <input type="time" id="schedule-startTime" value={startTime} onChange={onChangeStartTime} />
        </div>
        <div>
          <label htmlFor="schedule-endTime">종료시간</label>
          <input type="time" name="" id="schedule-endTime" value={endTime} onChange={onChangeEndTime} />
        </div>
        <div>
          <label htmlFor="schedule-price">금액입력 (원)</label>
          <input
            type="text"
            id="schedule-price"
            value={price}
            onChange={onChangePrice}
            placeholder="금액을 입력해주세요"
          />
        </div>
      </div>
      <footer>
        <button className={schedule['prevButton']} onClick={handlePrevStep}>
          이전
        </button>
        <button className={schedule['nextButton']} onClick={handleNextStep}>
          다음
        </button>
      </footer>
      {showStaffModal ? <StaffModal onClose={closeStaffModal} staffs={staffs} setStaff={setStaff} /> : null}
    </section>
  );
};

export default Step4;
