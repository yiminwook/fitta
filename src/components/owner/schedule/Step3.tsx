/* eslint-disable react-hooks/exhaustive-deps */
import Calendar from '@/components/common/calendar/Calendar';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import scheduleSlice from '@/redux/slicers/schedule';
import schedule from '@/components/owner/schedule/Schedule.module.scss';

const Step3 = () => {
  const dispatch = useDispatch();
  const initialSelect = useSelector((state) => state.schedule.selected);
  const initialSchedule = useSelector((state) => state.schedule.schedule);
  const [selected, setSelected] = useState<string[]>(initialSchedule);

  const resetSelect = useCallback(() => {
    setSelected(() => initialSchedule);
  }, []);

  const handlePrevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const handleNextStep = useCallback(() => {
    dispatch(scheduleSlice.actions.saveSchedule({ selected: initialSelect, schedule: selected }));
    dispatch(scheduleSlice.actions.nextStep());
  }, [selected]);

  return (
    <section className={schedule['step3']}>
      <h2>Step3. 휴일과 보강일을 선택해주세요</h2>
      <Calendar multiSelect={true} selected={selected} setSelected={setSelected} />
      <button onClick={resetSelect}>선택 초기화</button>

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

export default Step3;
