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
    <Modal title="나가시겠습니까?" onClose={onClose}>
      <div>
        <button onClick={goBack}>나가기</button>
      </div>
    </Modal>
  );
};

export default GoBackModal;
