import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  name: '',
  email: '',
  image: '',
  id: '',
};

const eserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = eserSlice.actions;

export default eserSlice.reducer;
