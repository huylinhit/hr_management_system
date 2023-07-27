import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { LeaveType } from "../../models/leaveType";

interface LeaveTypeState {
    leaveTypesLoaded: boolean;
    leaveTypes: LeaveType[] | null;
    leaveTypeAdded: boolean;
    leaveTypeUpdated: boolean,
    status: string
  }

const leaveTypesAdapter = createEntityAdapter<LeaveType>({
    selectId: (leaveType) => leaveType.leaveTypeId,
  });
  
  export const fetchLeaveTypesAsync = createAsyncThunk<LeaveType[], void, { state: RootState }>(
    "employee/fetchLeaveTypesAsync",
    async (_, thunkAPI) => {
      try {
        const response = await agent.LeaveType.list();
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
  export const leaveTypeSlice = createSlice({
      name: 'leaveType',
      initialState: leaveTypesAdapter.getInitialState<LeaveTypeState>({
        leaveTypesLoaded: false,
        leaveTypes: null,
        leaveTypeAdded: false,
        leaveTypeUpdated: false,
        status: "idle"
      }),
      reducers: {
        setLeaveTypeAdded: (state, action) => {
          state.leaveTypeAdded = action.payload;
        },
        setLeaveTypeUpdated: (state, action) => {
          state.leaveTypeUpdated = action.payload;
        },
      },
      extraReducers: (builder => {
          builder.addCase(fetchLeaveTypesAsync.pending, (state) => {
              state.status = 'pendingFetchLeaveTypes'
          });
          builder.addCase(fetchLeaveTypesAsync.fulfilled, (state,action) => {
            leaveTypesAdapter.setAll(state,action.payload);
   
              state.status = 'idle';
              state.leaveTypesLoaded = true;
          });
          builder.addCase(fetchLeaveTypesAsync.rejected, (state,action) => {
              console.log(action.payload);
              state.status = 'idle';
          });
      })
  })
  
  export const { setLeaveTypeAdded, setLeaveTypeUpdated } = leaveTypeSlice.actions;
  export const leaveTypeSelectors = leaveTypesAdapter.getSelectors((state: RootState) => state.leaveType)