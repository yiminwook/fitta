import DisplayStep from '@/components/owner/schedule/DisplayStep';
import GoBackModal from '@/components/owner/schedule/GoBackModal';
import ResetModal from '@/components/owner/schedule/ResetModal';
import Step1 from '@/components/owner/schedule/Step1';
import Step2 from '@/components/owner/schedule/Step2';
import Step3 from '@/components/owner/schedule/Step3';
import Step4 from '@/components/owner/schedule/Step4';
import Step5 from '@/components/owner/schedule/Step5';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch, useSelector } from '@/redux/store';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import schedule from '@/components/owner/schedule/Schedule.module.scss';

const EditSchedule = () => {
  const navigate = useNavigate();

  const step = useSelector((state) => state.schedule.step);
  const showGoBackModal = useSelector((state) => state.schedule.showGoBackModal);
  const showResetModal = useSelector((state) => state.schedule.showResetModal);
  const dispatch = useDispatch();

  const openResetModal = () => {
    dispatch(scheduleSlice.actions.openResetModal());
  };

  const openGoBackModal = () => {
    dispatch(scheduleSlice.actions.openGoBackModal());
  };

  const preventGoBack = () => {
    openGoBackModal();
    window.history.pushState(null, '', window.location.href);
  };

  useEffect(() => {
    dispatch(scheduleSlice.actions.reset());
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      case 5:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  }, [step]);

  return (
    <>
      <DisplayStep />
      <>{stepRender()}</>
      <div className={schedule['reset']}>
        {step === 1 ? null : <button onClick={openResetModal}>처음으로 돌아가기</button>}
      </div>
      {showGoBackModal ? <GoBackModal /> : null}
      {showResetModal ? <ResetModal /> : null}
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
