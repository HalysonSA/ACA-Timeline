import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Scheduling } from '../types/scheduling';

interface SchedulingState {
  scheduling: Scheduling[];
}

const initialState: SchedulingState = {
  scheduling: [],
};

export const schedulingSlice = createSlice({
  name: 'scheduling',
  initialState,
  reducers: {
    setScheduling: (state, action: PayloadAction<Scheduling[]>) => {
      state.scheduling = action.payload;
    },
  },
});

export const { setScheduling } = schedulingSlice.actions;
export default schedulingSlice.reducer;
