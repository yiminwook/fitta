/* eslint-disable react-hooks/exhaustive-deps */
import Calendar from '@/components/common/calendar/Calendar';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Step1 = () => {
  const dispatch = useDispatch();
  const initialSelect = useSelector((state) => state.schedule.selected);
  const [selected, setSelected] = useState<string[]>(initialSelect);
  const [schedule, setSchedule] = useState<string[]>([]);

  const generateSchedule = useCallback(() => {
    const temp: string[] = [];
    if (selected.length !== 2) return;
    let start = dayjs(selected[0]);

    while (start.format('YYYY-MM-DD') !== selected[1]) {
      temp.push(start.format('YYYY-MM-DD'));
      start = start.add(1, 'day');
    }

    temp.push(start.format('YYYY-MM-DD'));
    setSchedule(() => temp);
  }, [selected]);

  const saveSchedule = useCallback(() => {
    console.log(selected);
    if (selected.length < 2) {
      toast.warning('시작일과 종료일을 선택해주세요');
      return;
    }
    dispatch(scheduleSlice.actions.saveSchedule({ selected, schedule }));
    dispatch(scheduleSlice.actions.nextStep());
  }, [selected, schedule]);

  const prevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  useEffect(() => {
    generateSchedule();
  }, [selected]);

  return (
    <section>
      <h2>시작일과 종료일을 선택해주세요</h2>
      <Calendar selected={selected} setSelected={setSelected} />
      <div>
        <button onClick={prevStep}>이전</button>
        <button onClick={saveSchedule}>다음</button>
      </div>
    </section>
  );
};

export default Step1;
