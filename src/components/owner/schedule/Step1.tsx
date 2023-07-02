/* eslint-disable react-hooks/exhaustive-deps */
import Calendar from '@/components/common/calendar/Calendar';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { generateSchedule } from '@/utils/generateSchedule';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import schedule from '@/components/owner/schedule/Schedule.module.scss';

const Step1 = () => {
  const dispatch = useDispatch();
  const initialStartEnd = useSelector((state) => state.schedule.startEnd);
  const [startEnd, setStartEnd] = useState<string[]>(initialStartEnd);

  const handleNextStep = useCallback(() => {
    if (startEnd.length !== 2) {
      toast.warning('시작일과 종료일을 선택해주세요');
      return;
    }
    const schedule = generateSchedule(startEnd);
    dispatch(scheduleSlice.actions.setSchedule({ startEnd: startEnd, schedule }));
    dispatch(scheduleSlice.actions.nextStep());
  }, [startEnd]);

  return (
    <section className={schedule['step2']}>
      <h2>Step1. 시작일과 종료일을 선택해주세요</h2>
      <Calendar selected={startEnd} setSelected={setStartEnd} />
      <footer>
        <button className={schedule['nextButton']} onClick={handleNextStep}>
          다음
        </button>
      </footer>
    </section>
  );
};

export default Step1;
