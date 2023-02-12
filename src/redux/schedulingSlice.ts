import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Scheduling } from '../types/scheduling';

export const schedulingSlice = createSlice({
  name: 'scheduling',
  initialState: [] as Scheduling[],
  reducers: {
    setScheduling: (state, action: PayloadAction<Scheduling[] | null>) => {
      if (action.payload) {
        return action.payload;
      }
      return [];
    },
  },
});

export const { setScheduling } = schedulingSlice.actions;
export default schedulingSlice.reducer;
