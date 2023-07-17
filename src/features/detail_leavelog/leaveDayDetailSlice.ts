import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LeaveDayDetail } from "../../app/models/leaveDayDetail";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface LeaveDayDetailState {
  leaveDayDetail: LeaveDayDetail[] | null;
  leaveDayDetailLoaded: boolean;
  status: string;
}

const initialState: LeaveDayDetailState = {
  leaveDayDetail: null,
  leaveDayDetailLoaded: false,
  status: "idle",
};
export const fetchLeaveDayDetailAsync = createAsyncThunk<
  LeaveDayDetail[],
  number,
  { state: RootState }
>("leavedaydetail/fetchLeaveDayDetailAsync", async (staffId, thunkAPI) => {
  try {
    const response = await agent.LeaveDayDetail.list(staffId);
    return response;
  } catch (error: any) {
    thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const leaveDayDetailSlice = createSlice({
  name: "leaveDayDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeaveDayDetailAsync.pending, (state) => {
      state.status = "pendingFetchLeaveDayDetailAsync";
    });
    builder.addCase(fetchLeaveDayDetailAsync.fulfilled, (state, action) => {
      state.leaveDayDetail = action.payload;
      state.leaveDayDetailLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchLeaveDayDetailAsync.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});
