import Modal from '@/components/layout/Modal';
import scheduleModal from '@/components/owner/schedule/ScheduleModal.module.scss';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import StaffList from '@/components/owner/schedule/StaffList';
import { StaffType } from '@/types/fittaApi';

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
  staffs: StaffType[];
  setStaff: Dispatch<SetStateAction<StaffType | null>>;
}

const StaffModal = ({ onClose, staffs, setStaff }: StaffModalProps) => {
  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as EventTarget & HTMLLIElement;
    if (target.value === undefined || target.value === null) return;
    const selectedStaff = { ...staffs[target.value] };
    setStaff(() => selectedStaff);
    onClose();
  };

  return (
    <Modal title="트레이너 선택" onClose={onClose} className={scheduleModal['staffModal']}>
      <StaffList staffs={staffs} onClick={onClick} />
    </Modal>
  );
};

export default StaffModal;
