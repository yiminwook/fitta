import Modal from '@/components/layout/Modal';
import { Dispatch, SetStateAction } from 'react';

const STAFFS = [
  { id: 1, name: '트레이너1' },
  { id: 2, name: '트레이너2' },
  { id: 3, name: '트레이너3' },
  { id: 4, name: '트레이너4' },
];

interface StaffModalProps {
  onClose: () => void;
  setStaffId: Dispatch<SetStateAction<number | null>>;
}

const StaffModal = ({ onClose, setStaffId }: StaffModalProps) => {
  const selectStaff = (id: number) => {
    setStaffId(() => id);
    onClose();
  };

  return (
    <Modal title="트레이너 선택" onClose={onClose}>
      <ul>
        {STAFFS.map(({ id, name }) => (
          <li key={`staff-modal-li-${id}`} onClick={() => selectStaff(id)} value={id}>
            {name}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default StaffModal;
