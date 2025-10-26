import { configureStore } from '@reduxjs/toolkit';
import progressReducer from '../../features/breeds/store/progressSlice';

// Configure the Redux store. Redux Toolkit includes redux-thunk by default,
// so we don't need to add it manually (avoids TS type mismatches with v2).
export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
