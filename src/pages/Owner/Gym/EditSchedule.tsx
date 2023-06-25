import Step1 from '@/components/owner/schedule/Step1';
import Step2 from '@/components/owner/schedule/Step2';
import Step3 from '@/components/owner/schedule/Step3';
import Step4 from '@/components/owner/schedule/Step4';
import { useUser } from '@/hooks/useAPI';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditSchedule = () => {
  const navigate = useNavigate();
  const { myData } = useUser();

  const step = useSelector((state) => state.schedule.step);

  const dispatch = useDispatch();

  const nextStep = useCallback(() => {
    dispatch(scheduleSlice.actions.nextStep());
  }, []);

  const prevStep = useCallback(() => {
    dispatch(scheduleSlice.actions.prevStep());
  }, []);

  useEffect(() => {
    dispatch(scheduleSlice.actions.reset());
  }, []);

  const stepRender = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <>
      <h1>step:: {step}</h1>
      <>{stepRender()}</>
      <div>
        <button onClick={prevStep}>이전</button>
        <button onClick={nextStep}>다음</button>
        <button onClick={() => dispatch(scheduleSlice.actions.reset())}>리셋</button>
      </div>
    </>
  );
};

export default EditSchedule;

//<section>
//<h1>스케쥴 추가</h1>
//{/* step1 */}
//<div>시작일</div>
//<div>종료일</div>
//<div>요일선택</div>
//{/* step2 */}
//<div>휴일선택 배열</div>
//{/* step3 */}
//<div>금액선택</div>
//<div>트레이너선택</div>
//{/* step4 */}
//<div>preview확인</div>
//</section>
