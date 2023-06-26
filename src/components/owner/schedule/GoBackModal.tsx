import Modal from '@/components/layout/Modal';
import scheduleSlice from '@/redux/slicers/schedule';
import { useDispatch } from '@/redux/store';

const GoBackModal = () => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(scheduleSlice.actions.closeGoBackModal());
  };

  const goBack = () => {
    window.history.go(-2);
  };

  return (
    <Modal title="주의" onClose={onClose}>
      <h2>작업중인 정보를 잃을 수 있습니다.</h2>
      <div>
        <button onClick={goBack}>나가기</button>
      </div>
    </Modal>
  );
};

export default GoBackModal;
