import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  status: string;
  message: string;
}

const initialState: ErrorState = {
  status: '',
  message: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
