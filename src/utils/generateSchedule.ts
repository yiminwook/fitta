import dayjs from '@/models/dayjs';

export const generateSchedule = (selectedDate: string[]) => {
  if (selectedDate.length !== 2) throw new Error('시작일과 종료일을 선택해주세요');
  const temp: string[] = [];
  let start = dayjs(selectedDate[0]);

  while (start.format('YYYY-MM-DD') !== selectedDate[1]) {
    temp.push(start.format('YYYY-MM-DD'));
    start = start.add(1, 'day');
  }

  temp.push(start.format('YYYY-MM-DD'));
  return temp;
};
