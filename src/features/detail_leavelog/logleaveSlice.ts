import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LogLeave } from "../../app/models/logLeave";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { StaticDatePicker } from "@mui/lab";

const logleaveAdapter = createEntityAdapter<LogLeave>({
    selectId: logleave => logleave.leaveLogId
})

export const fetchLogLeavesAsync = createAsyncThunk<LogLeave[]>(
    'logleaves/fetchLogLeavesAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.LogLeave.list();
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)


export const fetchLogLeavesStaffAsync = createAsyncThunk<LogLeave, number>(
    'logleaves/fetchLogLeaveAsync',
    async (staffId, thunkAPI) => {
        try {
            return await agent.LogLeave.listOfStaff(staffId);
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchLogLeaveAsync = createAsyncThunk<LogLeave, number>(
    'logleaves/fetchLogLeaveAsync',
    async (logLeaveId, thunkAPI) => {
        try {
            return await agent.LogLeave.details(logLeaveId);
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const logleaveSlice = createSlice({
    name: 'logleaves',
    initialState: logleaveAdapter.getInitialState({
        logleavesLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchLogLeavesAsync.pending, state => {
            state.status = 'pendingFetchLogLeaves'
        });
        builder.addCase(fetchLogLeavesAsync.fulfilled, (state, action) => {
            logleaveAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.logleavesLoaded = true;
        });
        builder.addCase(fetchLogLeavesAsync.rejected, (state) => {
            state.status = 'idle';
        });

        //listOfStaff
        builder.addCase(fetchLogLeavesStaffAsync.pending, state => {
            state.status = 'pendingFetchLogLeavesStaff'
        });

        builder.addCase(fetchLogLeavesStaffAsync.fulfilled, (state, action) => {
            if (Array.isArray(action.payload)) {
                logleaveAdapter.upsertMany(state, action.payload);
            } else {
                logleaveAdapter.upsertOne(state, action.payload);
            }
        })
    })
})






export const logleaveSelectors = logleaveAdapter.getSelectors((state: RootState) => state.logleave);