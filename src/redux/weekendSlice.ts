import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const weekendSlice = createSlice({
  name: 'isWeekend',
  initialState: Boolean,
  reducers: {
    setWeekend: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setWeekend } = weekendSlice.actions;
export default weekendSlice.reducer;
