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

  const prevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  const saveSchedule = useCallback(() => {
    dispatch(scheduleSlice.actions.saveSchedule({ selected: initialSelect, schedule: selected }));
    dispatch(scheduleSlice.actions.nextStep());
  }, [selected]);

  return (
    <section className={schedule['step3']}>
      <h2>휴일을 선택해주세요</h2>
      <Calendar multiSelect={true} selected={selected} setSelected={setSelected} />
      <button onClick={prevStep}>이전</button>
      <button onClick={saveSchedule}>다음</button>
      <button onClick={resetSelect}>다시선택</button>
    </section>
  );
};

export default Step3;
