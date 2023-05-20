import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './src/lib/redux/userSlice';

const store = configureStore({
  reducer: {
    user: exampleReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
