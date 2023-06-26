import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { beforeOneMonth, nextOneMonth, pascalMonth } from '@/utils/time';
import CalendarRow from '@/components/common/calendar/CalendarRow';
import dayjs from '@/models/dayjs';
import calendar from '@/components/common/calendar/Calendar.module.scss';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { Dayjs } from 'dayjs';

//date객체 월은 0부터 시작
//요일 1 => 월, 6 => 토요일

//한 주의 시작은 일요일부터 시작
interface CalenderProps {
  multiSelect?: boolean; //true일시 두개이상 선택
  selected: string[];
  setSelected: Dispatch<SetStateAction<CalenderProps['selected']>>;
}

export interface CalendarCellType {
  date: Dayjs;
}

const Calendar = ({ multiSelect = false, selected, setSelected }: CalenderProps) => {
  const [current, setCurrent] = useState(dayjs());

  const [matrix, setMatrix] = useState<CalendarCellType[][]>([]);

  const nowYear = useMemo(() => current.get('y'), [current]);
  const nowMonth = useMemo(() => current.get('M') + 1, [current]);
  const nowMonthStartDay = useMemo(() => current.startOf('M').get('day'), [current]); // 이번달 1일의 요일
  const nowMonthLastDate = useMemo(() => current.endOf('M').get('date'), [current]); // 이번달 마지막날(30/31일)

  const addSelected = (date: string) => {
    setSelected((pre) => {
      if (multiSelect === false && pre.length >= 2) return pre;
      return [...pre, date].sort();
    });
  };

  const cancelSelected = (date: string) => {
    setSelected((pre) => pre.filter((d) => d !== date));
  };

  const toggleSelected = (date: string) => {
    selected.includes(date) ? cancelSelected(date) : addSelected(date);
  };

  const handleBeforemonth = () => {
    const before = beforeOneMonth({ year: nowYear, month: nowMonth });
    setCurrent(() => dayjs(before));
  };

  const handleNextMonth = () => {
    const next = nextOneMonth({ year: nowYear, month: nowMonth });
    setCurrent(() => dayjs(next));
  };

  const renderMatrix = useCallback(() => {
    let temp: CalendarCellType[][] = [];
    let row: CalendarCellType[] = [];

    //이전달을 매트릭스에 추가
    let before = dayjs(beforeOneMonth({ year: nowYear, month: nowMonth }));
    let beforeMonth = before.get('M') + 1;
    let beforeMonthLength = before.endOf('M').get('date');
    const beforeYear = beforeMonth === 12 ? nowYear - 1 : nowYear;

    for (let j = 0; j < nowMonthStartDay; j++) {
      // 이번달 1일의 요일만큼 이전달을 추가
      const date = j + 1 + beforeMonthLength - nowMonthStartDay;
      row.push({
        date: dayjs(`${beforeYear}-${beforeMonth}-${date}`),
      });
      if (row.length === 7) {
        temp.push(row);
        row = [];
      }
    }

    //현재달을 매트릭스에 추가
    for (let nowDay = 1; nowDay <= nowMonthLastDate; nowDay++) {
      row.push({ date: dayjs(`${nowYear}-${nowMonth}-${nowDay}`) });
      if (row.length === 7) {
        temp.push(row);
        row = [];
      }
    }

    //다음달을 매트릭스에 추가
    const rowLength = row.length;
    const nextMonth = nowMonth >= 12 ? 1 : nowMonth + 1;
    const nextYear = nowMonth >= 12 ? nowYear + 1 : nowYear;
    for (let remain = 1; remain <= 7 - rowLength; remain++) {
      //남은 달력을 다음달로 채움
      row.push({ date: dayjs(`${nextYear}-${nextMonth}-${remain}`) });
    }
    //마지막 row을 담는다.
    temp.push(row);
    setMatrix(() => temp);
  }, [nowMonth, nowYear, nowMonthStartDay, nowMonthLastDate]);

  useEffect(() => {
    renderMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <>
      <table className={calendar['calendar']}>
        <thead>
          <tr className={calendar['nav']}>
            <td>
              <button onClick={handleBeforemonth}>
                <span className="blind">이전달로</span>
                <GrPrevious size="1rem" color="inherit" />
              </button>
            </td>
            <td colSpan={5}>
              <span className={calendar['yearMonth']}>{`${nowYear}년 ${pascalMonth(nowMonth)}월`}</span>
            </td>
            <td>
              <button onClick={handleNextMonth}>
                <span className="blind">다음달로</span>
                <GrNext size="1rem" color="inherit" />
              </button>
            </td>
          </tr>
          <tr>
            <td className={calendar['sunday']}>일</td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td>
            <td>금</td>
            <td className={calendar['saturday']}>토</td>
          </tr>
        </thead>
        <tbody>
          {matrix.map((rowArray, index) => (
            <CalendarRow
              key={`calendar-${nowYear}-${nowMonth}-${index}-row`}
              rowArray={rowArray}
              rowIndex={index}
              nowYear={nowYear}
              nowMonth={nowMonth}
              selected={selected}
              toggleSelect={toggleSelected}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;

// https://www.googleapis.com/calendar/v3/calendars/ko.south_korea.official%23holiday%40group.v.calendar.google.com/events?key={}&orderBy=startTime&singleEvents=true&timeMin=2022-01-01T00:00:00Z&timeMax=2022-01-13T00:00:00Z
