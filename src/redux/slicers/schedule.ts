import { StaffType } from '@/types/fittaApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScheduleInitialStateType {
  step: 1 | 2 | 3 | 4 | 5;
  showGoBackModal: boolean;
  showResetModal: boolean;
  startEnd: string[];
  schedule: string[];
  title: string;
  description: string;
  staff: null | StaffType;
  price: number;
}

const scheduleInitialState: ScheduleInitialStateType = {
  step: 1,
  showGoBackModal: false,
  showResetModal: false,
  startEnd: [],
  schedule: [],
  title: '',
  description: '',
  staff: null,
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
    openResetModal: (prev) => {
      if (prev.showGoBackModal === true) return prev;
      prev.showResetModal = true;
    },
    closeResetModal: (prev) => {
      prev.showResetModal = false;
    },
    openGoBackModal: (prev) => {
      if (prev.showResetModal === true) return prev;
      prev.showGoBackModal = true;
    },
    closeGoBackModal: (prev) => {
      prev.showGoBackModal = false;
    },
    nextStep: (prev) => {
      if (prev.step === 5) return prev;
      prev.step++;
    },
    prevStep: (prev) => {
      if (prev.step === 1) return prev;
      prev.step--;
    },
    setTitleAndDesc: (prev, action: PayloadAction<{ title: string; description: string }>) => {
      prev.title = action.payload.title;
      prev.description = action.payload.description;
    },
    setSchedule: (prev, action: PayloadAction<{ startEnd: string[]; schedule: string[] }>) => {
      if (action.payload.startEnd.length < 2) throw new Error('must select start and end date');
      prev.startEnd = action.payload.startEnd;
      prev.schedule = action.payload.schedule;
    },
    setStaffAndPrice: (prev, action: PayloadAction<{ staff: StaffType; price: string }>) => {
      const price = Number(action.payload.price.split(',').join(''));
      if (Number.isNaN(price) === true) throw new Error('incurrect string price');
      prev.staff = action.payload.staff;
      prev.price = price;
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
