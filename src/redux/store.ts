import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schedulingReducer from './schedulingSlice';
import weekendReducer from './weekendSlice';
import modalControlsReducer from './modalControlsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  schedules: schedulingReducer,
  isWeekend: weekendReducer,
  isModalOpen: modalControlsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
