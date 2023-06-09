import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';

const initialState: User = {
  name: '',
  email: '',
  imageUri: '',
  id: '',
  bio: '',
  username: '',
  location: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
