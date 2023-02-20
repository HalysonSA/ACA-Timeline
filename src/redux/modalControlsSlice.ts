import { createSlice } from '@reduxjs/toolkit';

export const modalControlsSlice = createSlice({
  name: 'modalControls',
  initialState: {
    isModalOpen: false,
    modalType: '',
  },
  reducers: {
    setModalState: (state, action) => {
      state.isModalOpen = action.payload.isModalOpen;
      state.modalType = action.payload.modalType;
    },
  },
});

export const { setModalState } = modalControlsSlice.actions;
export default modalControlsSlice.reducer;
