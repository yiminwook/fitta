/* eslint-disable react-hooks/exhaustive-deps */
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useCallback, useState } from 'react';
import StaffModal from '@/components/owner/schedule/StaffModal';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import NumberInput from '@/components/common/input/NumberInput';

const Step4 = () => {
  const initialStaffId = useSelector((state) => state.schedule.staffId);
  const [staffId, setStaffId] = useState<number | null>(initialStaffId);
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openStaffModal = useCallback(() => {
    setShowStaffModal(() => true);
  }, []);

  const closeStaffModal = useCallback(() => {
    setShowStaffModal(() => false);
  }, []);

  const prevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const handleNextStep = useCallback(() => {
    dispatch(scheduleSlice.actions.nextStep());
  }, []);

  return (
    <section className={schedule['step4']}>
      <h2>Step4. 담당 트레이너와 금액을 선택해주세요</h2>
      <div className={schedule['interface']}>
        <div className={schedule['staff']}>
          <div>
            <p>트레이너</p>
            <button onClick={openStaffModal}>선택</button>
          </div>
          <div>{staffId !== null ? <div>선택된 트레이너 {staffId}</div> : null}</div>
        </div>
        <div className={schedule['price']}>
          <label htmlFor="schedule-price">금액입력</label>
          <NumberInput id="schedule-price" name="schedule-price" placeholder="" pattern={''} />
        </div>
      </div>
      <footer>
        <button className={schedule['prevButton']} onClick={prevStep}>
          이전
        </button>
        <button className={schedule['nextButton']} onClick={handleNextStep}>
          다음
        </button>
      </footer>
      {showStaffModal ? <StaffModal onClose={closeStaffModal} setStaffId={setStaffId} /> : null}
    </section>
  );
};

export default Step4;
