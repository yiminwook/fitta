import GoBackModal from '@/components/owner/schedule/GoBackModal';
import Step1 from '@/components/owner/schedule/Step1';
import Step2 from '@/components/owner/schedule/Step2';
import Step3 from '@/components/owner/schedule/Step3';
import Step4 from '@/components/owner/schedule/Step4';
import { useUser } from '@/hooks/useAPI';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditSchedule = () => {
  const navigate = useNavigate();
  const { myData } = useUser();

  const step = useSelector((state) => state.schedule.step);
  const showGoBackModal = useSelector((state) => state.schedule.showGoBackModal);

  const dispatch = useDispatch();

  const resetSchedule = () => {
    dispatch(scheduleSlice.actions.reset());
  };

  const openGoBackModal = useCallback(() => {
    dispatch(scheduleSlice.actions.openGoBackModal());
  }, []);

  const preventGoBack = () => {
    openGoBackModal();
    window.history.pushState(null, '', window.location.href);
  };

  useEffect(() => {
    resetSchedule();
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  const stepRender = useCallback(() => {
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
  }, [step]);

  return (
    <>
      <h1>step:: {step}</h1>
      <>{stepRender()}</>
      <div>
        <button onClick={resetSchedule}>처음으로 돌아가기</button>
      </div>
      {showGoBackModal ? <GoBackModal /> : null}
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
