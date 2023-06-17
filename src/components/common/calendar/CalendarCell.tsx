import { CalendarCellType } from '@/components/common/calendar/Calendar';

interface CalendarCellProps {
  cell: CalendarCellType;
  rowIndex: number;
  colIndex: number;
  nowYear: number;
  nowMonth: number;
}

const CalendarCell = ({ cell, rowIndex, colIndex, nowYear, nowMonth }: CalendarCellProps) => {
  const { month, date } = cell;
  return <td>{`${month} / ${date}`}</td>;
};

export default CalendarCell;
