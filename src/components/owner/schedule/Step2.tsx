/* eslint-disable react-hooks/exhaustive-deps */
import Calendar from '@/components/common/calendar/Calendar';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { generateSchedule } from '@/utils/generateSchedule';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import schedule from '@/components/owner/schedule/Schedule.module.scss';

const Step2 = () => {
  const dispatch = useDispatch();
  const initialSelect = useSelector((state) => state.schedule.selected);
  const [selected, setSelected] = useState<string[]>(initialSelect);

  const handlePrevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const handleNextStep = useCallback(() => {
    if (selected.length !== 2) {
      toast.warning('시작일과 종료일을 선택해주세요');
      return;
    }
    const schedule = generateSchedule(selected);
    dispatch(scheduleSlice.actions.saveSchedule({ selected, schedule }));
    dispatch(scheduleSlice.actions.nextStep());
  }, [selected]);

  return (
    <section className={schedule['step2']}>
      <h2>Step2. 시작일과 종료일을 선택해주세요</h2>
      <Calendar selected={selected} setSelected={setSelected} />
      <footer>
        <button className={schedule['prevButton']} onClick={handlePrevStep}>
          이전
        </button>
        <button className={schedule['nextButton']} onClick={handleNextStep}>
          다음
        </button>
      </footer>
    </section>
  );
};

export default Step2;
