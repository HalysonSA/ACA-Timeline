import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/users';

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    checkUserState: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { checkUserState } = userSlice.actions;
export default userSlice.reducer;
