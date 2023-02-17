import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schedulingReducer from './schedulingSlice';
import weekendReducer from './weekendSlice';

const rootReducer = combineReducers({
  user: userReducer,
  schedules: schedulingReducer,
  isWeekend: weekendReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
