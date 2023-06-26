import { CalendarCellType } from '@/components/common/calendar/Calendar';
import CalendarCell from '@/components/common/calendar/CalendarCell';

interface CalendarRowProps {
  rowArray: CalendarCellType[];
  rowIndex: number;
  nowYear: number;
  nowMonth: number;
  selected: string[];
  toggleSelect: (date: string) => void;
}

const CalendarRow = ({ rowArray, rowIndex, nowYear, nowMonth, selected, toggleSelect }: CalendarRowProps) => {
  return (
    <tr>
      {rowArray.map((cell, index) => (
        <CalendarCell
          key={`calendar-${nowYear}-${nowMonth}-${rowIndex}-${index}-cell`}
          cell={cell}
          rowIndex={rowIndex}
          colIndex={index}
          nowYear={nowYear}
          nowMonth={nowMonth}
          selected={selected}
          toggleSelect={toggleSelect}
        />
      ))}
    </tr>
  );
};

export default CalendarRow;
