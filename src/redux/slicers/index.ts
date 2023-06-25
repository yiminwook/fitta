import { combineReducers } from '@reduxjs/toolkit';
import scheduleSlice from '@/redux/slicers/schedule';

const reducer = combineReducers({
  schedule: scheduleSlice.reducer,
});

export default reducer;
