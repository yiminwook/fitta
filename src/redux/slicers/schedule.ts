import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScheduleInitialStateType {
  step: 1 | 2 | 3 | 4 | 5;
  showGoBackModal: boolean;
  selected: string[];
  schedule: string[];
  title: string;
  description: string;
  staffId: null | number;
  price: number;
}

const scheduleInitialState: ScheduleInitialStateType = {
  step: 1,
  showGoBackModal: false,
  selected: [],
  schedule: [],
  title: '',
  description: '',
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
    openGoBackModal: (prev) => {
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
    saveSchedule: (prev, action: PayloadAction<{ selected: string[]; schedule: string[] }>) => {
      if (action.payload.selected.length < 2) throw new Error('must select start and end date');
      prev.selected = action.payload.selected;
      prev.schedule = action.payload.schedule;
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
