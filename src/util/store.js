import { configureStore } from '@reduxjs/toolkit'
import { reposSlice } from './reposSlice';
import { usersSlice } from './usersSlice';

export const store = configureStore({
  reducer: {
      users: usersSlice.reducer,
      repos: reposSlice.reducer,
  },
});
