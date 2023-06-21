// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    // Other authentication state properties
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Other reducers
  },
});

export const { setToken } = authSlice.actions;

export const selectToken = (state: any) => state.auth.token;

export default authSlice.reducer;
