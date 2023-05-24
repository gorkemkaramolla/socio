import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  mode: '',
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = modeSlice.actions;

export default modeSlice.reducer;
