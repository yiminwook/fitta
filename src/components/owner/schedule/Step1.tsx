import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch } from '@/redux/store';
import { ChangeEvent, useCallback, useState } from 'react';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';

const Step1 = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [throttle, setThrottle] = useState(false);

  const saveSchedule = useCallback(() => {
    dispatch(scheduleSlice.actions.nextStep());
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const lineCount = e.target.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1;
    const textCount = e.target.value.length;
    if (textCount >= 700) {
      if (throttle === true) return;
      setThrottle(() => true);
      toast.warning('700자까지 입력가능합니다.');
      setTimeout(() => {
        setThrottle(() => false);
      }, 3000);
      return;
    }

    if (lineCount >= 10) {
      if (throttle === true) return;
      setThrottle(() => true);
      toast.warning('10줄까지 입력가능합니다.');
      setTimeout(() => {
        setThrottle(() => false);
      }, 3000);
      return;
    }

    setDescription(() => e.target.value);
  };

  return (
    <section className={schedule['step1']}>
      <h2>제목과 설명을 입력해주세요</h2>
      <div>
        <input type="text" />
        <TextareaAutosize minRows={5} onChange={onChange} value={description} style={{ resize: 'none' }} />
      </div>
      <div>
        <button onClick={saveSchedule}>다음</button>
      </div>
    </section>
  );
};

export default Step1;
