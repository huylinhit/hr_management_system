import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LogLeave } from "../../app/models/logLeave";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { StaticDatePicker } from "@mui/lab";
import { LeaveDayDetail } from "../../app/models/leaveDayDetail";

interface LogLeaveState {
  leaveDayDetail: LeaveDayDetail[] | null;
  logleavesLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  logLeaveAdded: boolean;
}

const logleaveAdapter = createEntityAdapter<LogLeave>({
  selectId: (logleave) => logleave.leaveLogId,
});

export const fetchLogLeavesAsync = createAsyncThunk<LogLeave[]>(
  "logleaves/fetchLogLeavesAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.LogLeave.list();
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchLogLeavesStaffAsync = createAsyncThunk<LogLeave, number>(
  "logleaves/fetchLogLeavesStaffAsync",
  async (staffId, thunkAPI) => {
    try {
      return await agent.LogLeave.listOfStaff(staffId);
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  } 
);

export const fetchLogLeaveAsync = createAsyncThunk<
  LogLeave,
  { logLeaveId: number; staffId: number }
>("logleaves/fetchLogLeaveAsync", async ({ logLeaveId, staffId }, thunkAPI) => {
  try {
    return await agent.LogLeave.details(logLeaveId, staffId);
  } catch (error: any) {
    thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const logleaveSlice = createSlice({
  name: "logleaves",
  initialState: logleaveAdapter.getInitialState<LogLeaveState>({
    logleavesLoaded: false,
    leaveDayDetail: [],
    status: "idle",
    filtersLoaded: false,
    logLeaveAdded: false,
  }),
  reducers: {
    setLogLeaveAdded: (state, action) => {
      state.logLeaveAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogLeavesAsync.pending, (state) => {
      state.status = "pendingFetchLogLeaves";
    });
    builder.addCase(fetchLogLeavesAsync.fulfilled, (state, action) => {
      logleaveAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.logleavesLoaded = true;
    });
    builder.addCase(fetchLogLeavesAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(fetchLogLeaveAsync.pending, (state) => {
      state.status = "pendingFetchLogLeave";
    });
    builder.addCase(fetchLogLeaveAsync.fulfilled, (state, action) => {
      logleaveAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchLogLeaveAsync.rejected, (state) => {
      state.status = "idle";
    });

    //listOfStaff
    builder.addCase(fetchLogLeavesStaffAsync.pending, (state) => {
      state.status = "pendingFetchLogLeavesStaff";
    });

    builder.addCase(fetchLogLeavesStaffAsync.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        logleaveAdapter.upsertMany(state, action.payload);
      } else {
        logleaveAdapter.upsertOne(state, action.payload);
      }
    });
  },
});

export const { setLogLeaveAdded } = logleaveSlice.actions;
export const logleaveSelectors = logleaveAdapter.getSelectors((state: RootState) => state.logleave);
