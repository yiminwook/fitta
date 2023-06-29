import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { ChangeEvent, useCallback, useState } from 'react';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { useInput } from '@/hooks/useInput';

const Step1 = () => {
  const dispatch = useDispatch();
  const initialTitle = useSelector((state) => state.schedule.title);
  const initialDescription = useSelector((state) => state.schedule.description);
  const [title, _setTitle, onChangeTitle] = useInput(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isThrottle, setIsThrottle] = useState(false);

  const saveSchedule = useCallback(() => {
    // dispatch
    dispatch(scheduleSlice.actions.nextStep());
  }, []);

  const onThrottle = useCallback(() => {
    setIsThrottle(() => true);
  }, []);

  const clearThrottle = useCallback(() => {
    setIsThrottle(() => false);
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const lineCount = e.target.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1;
      const textCount = e.target.value.length;
      if (textCount >= 700) {
        if (isThrottle === true) return;
        onThrottle();
        toast.warning('700자까지 입력가능합니다.');
        setTimeout(() => {
          clearThrottle();
        }, 3000);
        return;
      }

      if (lineCount >= 10) {
        if (isThrottle === true) return;
        onThrottle();
        toast.warning('10줄까지 입력가능합니다.');
        setTimeout(() => {
          clearThrottle();
        }, 3000);
        return;
      }

      setDescription(() => e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isThrottle],
  );

  return (
    <section className={schedule['step1']}>
      <h2>스케줄 제목과 설명을 입력해주세요</h2>
      <div className={schedule['interface']}>
        <label htmlFor="schedule-title">제목</label>
        <input
          type="text"
          id="schedule-title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="schedule-description">상세정보</label>
        <TextareaAutosize
          minRows={1}
          onChange={onChange}
          value={description}
          style={{ resize: 'none' }}
          id="schedul-description"
          placeholder="상세정보를 입력해주세요"
        />
      </div>
      <footer>
        <button onClick={saveSchedule}>다음</button>
      </footer>
    </section>
  );
};

export default Step1;
