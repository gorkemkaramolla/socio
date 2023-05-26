import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  name: '',
  email: '',
  image: '',
  id: '',
  bio: '',
  location: '',
};

const userSlice = createSlice({
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

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
