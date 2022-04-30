import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  repos: [],
};

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
  },
});

export const { setRepos } = reposSlice.actions;
