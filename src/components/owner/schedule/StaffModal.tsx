import Modal from '@/components/layout/Modal';
import scheduleModal from '@/components/owner/schedule/ScheduleModal.module.scss';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const STAFFS = [
  { id: 1, name: '트레이너1' },
  { id: 2, name: '트레이너2' },
  { id: 3, name: '트레이너3' },
  { id: 4, name: '트레이너4' },
  { id: 5, name: '트레이너5' },
  { id: 6, name: '트레이너6' },
  { id: 7, name: '트레이너7' },
  { id: 8, name: '트레이너8' },
  { id: 9, name: '트레이너9' },
  { id: 10, name: '트레이너10' },
  { id: 11, name: '트레이너11' },
  { id: 12, name: '트레이너12' },
  { id: 13, name: '트레이너13' },
  { id: 14, name: '트레이너14' },
  { id: 15, name: '트레이너15' },
  { id: 16, name: '트레이너16' },
  { id: 17, name: '트레이너17' },
  { id: 18, name: '트레이너18' },
];

interface StaffModalProps {
  onClose: () => void;
  setStaffId: Dispatch<SetStateAction<number | null>>;
}

const StaffModal = ({ onClose, setStaffId }: StaffModalProps) => {
  const selectStaff = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as EventTarget & HTMLLIElement;
    if (!target || target.value === undefined || target.value === null) return;
    setStaffId(() => target.value);
    onClose();
  };

  return (
    <Modal title="트레이너 선택" onClose={onClose} className={scheduleModal['staffModal']}>
      <Scrollbars autoHeight autoHeightMax={'20rem'}>
        <ul>
          {STAFFS.map(({ id, name }) => (
            <li key={`staff-modal-li-${id}`} onClick={selectStaff} value={id}>
              {name}
            </li>
          ))}
        </ul>
      </Scrollbars>
    </Modal>
  );
};

export default StaffModal;
