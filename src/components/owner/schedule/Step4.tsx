/* eslint-disable react-hooks/exhaustive-deps */
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useCallback, useMemo, useState } from 'react';
import StaffModal from '@/components/owner/schedule/StaffModal';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import NumberInput from '@/components/common/input/NumberInput';
import { StaffType } from '@/types/fittaApi';
import { useOwner } from '@/hooks/useAPI';
import { useParams } from 'react-router-dom';

const Step4 = () => {
  const initialStaff = useSelector((state) => state.schedule.staff);
  const [staff, setStaff] = useState<null | StaffType>(initialStaff);
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

  const prevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const handleNextStep = useCallback(() => {
    dispatch(scheduleSlice.actions.nextStep());
  }, []);

  const staffs = useMemo(() => {
    const gym = ownerMyData?.gymList.find((gym) => gym.id === Number(gymId));
    return gym && gym.staffs.length > 0 ? gym.staffs.slice() : [];
  }, [ownerMyData?.id, gymId]);

  return (
    <section className={schedule['step4']}>
      <h2>Step4. 담당 트레이너와 금액을 선택해주세요</h2>
      <div className={schedule['interface']}>
        <div className={schedule['staff']}>
          <div>
            <p>트레이너</p>
            <button onClick={openStaffModal}>선택</button>
          </div>
          <div>
            {staff !== null ? (
              <div>
                <div>{staff.name}</div>
              </div>
            ) : null}
          </div>
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
      {showStaffModal ? <StaffModal onClose={closeStaffModal} staffs={staffs} setStaff={setStaff} /> : null}
    </section>
  );
};

export default Step4;
