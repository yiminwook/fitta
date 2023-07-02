import { useSelector } from '@/redux/store';
import schedule from '@/components/owner/schedule/Schedule.module.scss';
import { useEffect, useRef } from 'react';

const DisplayStep = () => {
  const step = useSelector((store) => store.schedule.step);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.childNodes.forEach((el) => {
      const element = el as HTMLDivElement;
      element.classList.remove(schedule['current']);
    });
    const childEl = ref.current?.childNodes[step - 1] as HTMLDivElement | null;
    if (!childEl) return;
    childEl.classList.add(schedule['current']);
  }, [step]);

  return (
    <div className={schedule['displayStep']} ref={ref}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  );
};

export default DisplayStep;
