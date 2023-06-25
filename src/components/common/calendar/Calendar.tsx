import { useEffect, useMemo, useState } from 'react';
import { beforeOneMonth, nextOneMonth, pascalMonth } from '@/utils/time';
import CalendarRow from '@/components/common/calendar/CalendarRow';
import dayjs from '@/models/dayjs';

//date객체 월은 0부터 시작
//요일 1 => 월, 6 => 토요일

//한 주의 시작은 일요일부터 시작

export interface CalendarCellType {
  month: number;
  date: number;
}

const Calendar = () => {
  const [now, setNow] = useState(dayjs());
  const [matrix, setMatrix] = useState<CalendarCellType[][]>([]);

  const nowYear = useMemo(() => now.get('y'), [now]);
  const nowMonth = useMemo(() => now.get('M') + 1, [now]);
  const nowMonthStartDay = useMemo(() => now.startOf('M').get('day'), [now]); // 이번달 1일의 요일
  const nowMonthLastDate = useMemo(() => now.endOf('M').get('date'), [now]); // 이번달 마지막날
  console.log(now.format('YYYY. MM. DD. dddd. HH:mm'));

  const handleBeforemonth = () => {
    const before = beforeOneMonth({ year: nowYear, month: nowMonth });
    setNow(() => dayjs(before));
  };

  const handleNextMonth = () => {
    const next = nextOneMonth({ year: nowYear, month: nowMonth });
    setNow(() => dayjs(next));
  };

  useEffect(() => {
    let temp: CalendarCellType[][] = [];
    let row: CalendarCellType[] = [];
    let before = dayjs(beforeOneMonth({ year: nowYear, month: nowMonth }));
    let beforeMonth = before.get('M') + 1;
    let beforeMonthLength = before.endOf('M').get('date');

    for (let j = 0; j < nowMonthStartDay; j++) {
      // 이번달 1일의 요일만큼 이전달을 추가
      row.push({ month: beforeMonth, date: beforeMonthLength-- });
      if (row.length === 7) {
        temp.push(row);
        row = [];
      }
    }

    for (let nowDay = 1; nowDay <= nowMonthLastDate; nowDay++) {
      row.push({ month: nowMonth, date: nowDay });
      if (row.length === 7) {
        temp.push(row);
        row = [];
      }
    }

    const rowLength = row.length;
    const nextMonth = nowMonth >= 12 ? 1 : nowMonth + 1;
    for (let remain = 1; remain <= 7 - rowLength; remain++) {
      //남은 달력을 다음달로 채움
      row.push({ month: nextMonth, date: remain });
    }
    //마지막 row을 담는다.
    temp.push(row);
    setMatrix(() => temp);
  }, [now]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td onClick={handleBeforemonth}>&#60;</td>
            <td colSpan={5}>
              <span id="calYear">{nowYear}</span>년<span id="calMonth">{pascalMonth(nowMonth)}</span>월
            </td>
            <td onClick={handleNextMonth}>&#62;</td>
          </tr>
          <tr>
            <td>일</td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td>
            <td>금</td>
            <td>토</td>
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
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;

// https://www.googleapis.com/calendar/v3/calendars/ko.south_korea.official%23holiday%40group.v.calendar.google.com/events?key={}&orderBy=startTime&singleEvents=true&timeMin=2022-01-01T00:00:00Z&timeMax=2022-01-13T00:00:00Z
