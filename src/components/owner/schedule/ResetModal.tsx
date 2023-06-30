import Modal from '@/components/layout/Modal';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch } from '@/redux/store';

const ResetModal = () => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(scheduleSlice.actions.closeResetModal());
  };

  const handleReset = () => {
    dispatch(scheduleSlice.actions.reset());
    onClose();
  };

  return (
    <Modal title="처음으로 돌아가시겠습니까?" onClose={onClose}>
      <div>입력된 정보가 초기화됩니다.</div>
      <div>
        <button onClick={handleReset}>확인</button>
      </div>
    </Modal>
  );
};

export default ResetModal;
