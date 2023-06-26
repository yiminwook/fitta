import { CalendarCellType } from '@/components/common/calendar/Calendar';
import { memo, useMemo } from 'react';
import calendar from '@/components/common/calendar/Calendar.module.scss';

interface CalendarCellProps {
  cell: CalendarCellType;
  rowIndex: number;
  colIndex: number;
  nowYear: number;
  nowMonth: number;
  selected: string[];
  toggleSelect: (date: string) => void;
}

const CalendarCell = ({ cell, rowIndex, colIndex, nowYear, nowMonth, selected, toggleSelect }: CalendarCellProps) => {
  const { date } = cell;

  const format = useMemo(() => date.format('YYYY-MM-DD'), [date]);

  const onClick = () => {
    toggleSelect(format);
  };

  const setClassName = useMemo(() => {
    let classNames: any[] = [];
    if (nowMonth !== date.get('month') + 1) {
      classNames.push(calendar['surround']);
    }

    if (selected.includes(format)) {
      classNames.push(calendar['selected']);
    }

    if (selected[0] === format) {
      classNames.push(calendar['start']);
    }

    if (selected[selected.length - 1] === format) {
      classNames.push(calendar['end']);
    }

    return classNames.join(' ');
  }, [selected, date, nowMonth, format]);

  return <td onClick={onClick} className={setClassName}>{`${date.get('date')}`}</td>;
};

export default memo(CalendarCell);
