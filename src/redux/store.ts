import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import schedulingReducer from './schedulingSlice';
const rootReducer = combineReducers({
  user: userReducer,
  schedules: schedulingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
