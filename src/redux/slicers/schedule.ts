import dayjs from '@/models/dayjs';
import { createSlice } from '@reduxjs/toolkit';

interface ScheduleInitialStateType {
  step: 1 | 2 | 3 | 4;
  startDate: string;
  endDate: string;
  days: (1 | 2 | 3 | 4 | 5 | 6 | 7)[]; //요일 배열
  holidays: string[]; //휴일 배열
  staffId: null | number;
  price: number;
}

const scheduleInitialState: ScheduleInitialStateType = {
  step: 1,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  days: [],
  holidays: [],
  staffId: null,
  price: 0,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: scheduleInitialState,
  reducers: {
    //동기
    reset: () => {
      return scheduleInitialState;
    },
    nextStep: (prev) => {
      if (prev.step === 4) return prev;
      prev.step++;
    },
    prevStep: (prev) => {
      if (prev.step === 1) return prev;
      prev.step--;
    },
    setStartDate: (prev, action) => {
      if (typeof action.payload === 'string') {
        prev.startDate = action.payload;
      }
    },
    setEndDate: (prev, action) => {
      if (typeof action.payload === 'string') {
        prev.endDate = action.payload;
      }
    },
    resetDays: (prev) => {
      prev.days = [];
    },
    addDays: (prev, action) => {
      prev.days.push(action.payload);
    },
    removeDays: (prev, action) => {
      prev.days.filter((day) => day !== action.payload);
    },
    resetHolidays: (prev) => {
      prev.holidays = [];
    },
    addHolidays: (prev, action) => {
      prev.holidays.push(action.payload);
    },
    removeHoliday: (prev, action) => {
      prev.holidays.filter((day) => day !== action.payload);
    },
    setStaff: (prev, action) => {
      if (action.payload === null || (typeof action.payload === 'number' && Number.isNaN(action.payload) === false)) {
        prev.staffId = action.payload;
      }
    },
    setPrice: (prev, action) => {
      if (typeof action.payload === 'number' && Number.isNaN(action.payload) === false) {
        prev.price = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    //비동기
    builder.addMatcher(
      (action) => {
        return action.type.includes('/rejected') === true;
      },
      (state) => state,
    );
    builder.addDefaultCase((state, action) => {});
  },
});

export default scheduleSlice;
