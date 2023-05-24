import { configureStore } from '@reduxjs/toolkit';
import userReducer from './lib/redux/userSlice';
import useTheme from './lib/redux/darkMode';

const store = configureStore({
  reducer: {
    user: userReducer,
    mode: useTheme,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
