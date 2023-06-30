import Modal from '@/components/layout/Modal';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch } from '@/redux/store';
import scheduleModal from '@/components/owner/schedule/ScheduleModal.module.scss';

const GoBackModal = () => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(scheduleSlice.actions.closeGoBackModal());
  };

  const goBack = () => {
    window.history.go(-2);
  };

  return (
    <Modal title="주의" onClose={onClose} className={scheduleModal['goBackModal']}>
      <h2>작업중인 정보를 잃을 수 있습니다.</h2>
      <footer>
        <button onClick={goBack}>나가기</button>
      </footer>
    </Modal>
  );
};

export default GoBackModal;
