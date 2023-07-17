import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AvatarState {
  avatarUrls: string[];
  avatarsLoaded: boolean;
}

const initialState: AvatarState = {
  avatarUrls: [],
  avatarsLoaded: false,
}
const avatarSlice = createSlice({
  name: "avatar",
  initialState: initialState,
  reducers: {
    setAvatarUrl: (state, action) => {
      state.avatarUrls = action.payload;
    },
  },
});