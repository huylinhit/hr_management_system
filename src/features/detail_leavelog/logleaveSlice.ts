import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LogLeave, LogLeaveParams } from "../../app/models/logLeave";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { StaticDatePicker } from "@mui/lab";
import { LeaveDayDetail } from "../../app/models/leaveDayDetail";
import { MetaData } from "../../app/models/pagination";

interface LogLeaveState {
  leaveDayDetail: LeaveDayDetail[] | null;
  logleavesLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  logLeaveAdded: boolean;
  departments: string[];
  logleaveParams: LogLeaveParams;
  metaData: MetaData | null;
}

const logleaveAdapter = createEntityAdapter<LogLeave>({
  selectId: (logleave) => logleave.leaveLogId,
});


function getAxiosParams(logleaveParams: LogLeaveParams) {
  const params = new URLSearchParams();

  params.append('pageNumber', logleaveParams.pageNumber.toString());
  // params.append('pageSize', logleaveParams.pageSize.toString());
  // params.append('orderBy', logleaveParams.orderBy);

  console.log("Logleave: ", logleaveParams);

  if (logleaveParams.searchTerm) params.append('searchTerm', logleaveParams.searchTerm.toString());
  if (logleaveParams.departments?.length > 0) params.append('departments', logleaveParams.departments.toString());

  return params;
}


export const fetchLogLeavesAsync = createAsyncThunk<LogLeave[], void, {state: RootState}>(
  "logleaves/fetchLogLeavesAsync",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().logleave.logleaveParams);
    try {
      const response =  await agent.LogLeave.list(params);
      thunkAPI.dispatch(setLogLeaveMetaData(response.metaData))
      return response.items;
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


export const fetchFiltersLogLeaves = createAsyncThunk(
  'logleaves/fetchFiltersLeaves',
  async (_, thunkAPI) => {
      try {
          const response =  agent.LogLeave.filters()
          return response;
      } catch (error: any) {
          thunkAPI.rejectWithValue({ error: error.data })
      }
  }
)


function initParams() {
  return {
    pageNumber: 1,
    pageSize: 30,
    departments: []
  }
}

export const logleaveSlice = createSlice({
  name: "logleaves",
  initialState: logleaveAdapter.getInitialState<LogLeaveState>({
    logleavesLoaded: false,
    leaveDayDetail: [],
    status: "idle",
    filtersLoaded: false,
    logLeaveAdded: false,
    departments: [],
    logleaveParams: initParams(),
    metaData: null
  }),
  reducers: {
    setLogLeaveAdded: (state, action) => {
      state.logLeaveAdded = action.payload;
    },
    setLogLeaveParams: (state, action) => {
      state.logleavesLoaded = false;
      state.logleaveParams = { ...state.logleaveParams, ...action.payload, pageNumber: 1 }
    },
    setPageNumber: (state, action) => {
      state.logleavesLoaded = false;
      state.logleaveParams = { ...state, ...action.payload }
    },
    resetlogLeaveParams: (state) => {
      state.logleavesLoaded = false;
      state.logleaveParams = initParams();
    },
    setLogLeaveMetaData: (state, action) => {
      state.metaData = action.payload;
    }
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

    //Filter
    builder.addCase(fetchFiltersLogLeaves.pending, (state) => {
      state.status = "pendingFetchFilterLLogLeave"
    })
    builder.addCase(fetchFiltersLogLeaves.fulfilled, (state, action) => {
      
      state.departments = action.payload;
      state.status = 'idle'
      state.filtersLoaded = true;
    })
    builder.addCase(fetchFiltersLogLeaves.rejected, (state, action) => {
      state.status = 'idle'
    })
  },
});

export const { setLogLeaveAdded ,setLogLeaveMetaData, setLogLeaveParams, setPageNumber , resetlogLeaveParams } = logleaveSlice.actions;
export const logleaveSelectors = logleaveAdapter.getSelectors((state: RootState) => state.logleave);
