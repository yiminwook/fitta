import { CalendarCellType } from '@/components/common/calendar/Calendar';
import CalendarCell from '@/components/common/calendar/CalendarCell';

interface CalendarRowProps {
  rowArray: CalendarCellType[];
  rowIndex: number;
  nowYear: number;
  nowMonth: number;
}

const CalendarRow = ({ rowArray, rowIndex, nowYear, nowMonth }: CalendarRowProps) => {
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
        />
      ))}
    </tr>
  );
};

export default CalendarRow;
