import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useCallback, useState } from 'react';
import StaffModal from '@/components/owner/schedule/StaffModal';
import schedule from '@/components/owner/schedule/Schedule.module.scss';

const Step4 = () => {
  const initialStaffId = useSelector((state) => state.schedule.staffId);
  const [staffId, setStaffId] = useState<number | null>(initialStaffId);
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const prevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const openStaffModal = useCallback(() => {
    setShowStaffModal(() => true);
  }, []);
  const closeStaffModal = useCallback(() => {
    setShowStaffModal(() => false);
  }, []);

  const saveSchedule = useCallback(() => {
    dispatch(scheduleSlice.actions.nextStep());
  }, []);

  return (
    <section className={schedule['step4']}>
      <h2>step3</h2>
      <div>
        <div>선택된 트레이너 &gt;&gt;&gt; {staffId}</div>
        <button onClick={openStaffModal}>트레이너 선택</button>
      </div>
      <div>
        <label htmlFor="schedule-price">가격입력</label>
        <input type="number" name="initialSchedule" id="initialSchedule" />
      </div>
      <div>
        <button onClick={prevStep}>이전</button>
        <button onClick={saveSchedule}>다음</button>
      </div>
      {showStaffModal ? <StaffModal onClose={closeStaffModal} setStaffId={setStaffId} /> : null}
    </section>
  );
};

export default Step4;
