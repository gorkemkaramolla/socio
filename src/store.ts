import { configureStore } from '@reduxjs/toolkit';
import userReducer from './lib/redux/userSlice';
import useTheme from './lib/redux/darkMode';
import errorReducer from './lib/redux/error';
const store = configureStore({
  reducer: {
    user: userReducer,
    mode: useTheme,
    error: errorReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
