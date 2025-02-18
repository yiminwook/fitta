import Calendar from '@/components/common/calendar/Calendar';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Step5 = () => {
  const dispatch = useDispatch();
  const initialSelected = useSelector((state) => state.schedule.schedule);
  const title = useSelector((state) => state.schedule.title);
  const description = useSelector((state) => state.schedule.description);
  const startTime = useSelector((state) => state.schedule.startTime);
  const endTime = useSelector((state) => state.schedule.endTime);
  const price = useSelector((state) => state.schedule.price);
  const staff = useSelector((state) => state.schedule.staff);
  const [selected, setSelected] = useState(initialSelected);
  const { ownerId, gymId } = useParams<{ ownerId: string; gymId: string }>();

  const handlePrevStep = () => {
    dispatch(scheduleSlice.actions.prevStep());
  };

  const handleNextStep = () => {
    // post to server
    console.log({
      title,
      description,
      startTime,
      endTime,
      schedule: selected,
      price,
      staffId: staff?.id,
    });
  };

  return (
    <section className={schedule['step5']}>
      <h2>Step5. 입력된 정보를 확인하고 제출 해주세요</h2>
      <Calendar selected={selected} setSelected={setSelected} userSelect={false} />
      <div>{title}</div>
      <div>{description}</div>
      {staff ? <div>{staff.name}</div> : null}
      <div>
        <div>시작시간 {startTime}</div>
        <div>종료시간 {endTime}</div>
        <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원'}</div>
      </div>
      <footer>
        <button className={schedule['prevButton']} onClick={handlePrevStep}>
          이전
        </button>
        <button className={schedule['nextButton']} onClick={handleNextStep}>
          제출
        </button>
      </footer>
    </section>
  );
};

export default Step5;
