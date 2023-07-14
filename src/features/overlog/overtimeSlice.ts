import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { LogOt } from "../../app/models/logOt";

interface LogOvertimeState {
    logOtsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    logOtAdded: boolean;
}

const logOvertimesAdapter = createEntityAdapter<LogOt>({
    selectId: logot => logot.otLogId
})

export const fetchLogOtsAsync = createAsyncThunk<LogOt[], void>(
    'logot/fetchLogOtsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.LogOt.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchLogOtAsync = createAsyncThunk<LogOt, number>(
    'logot/fetchLogOtAsync',
    async (logOtId, thunkAPI) => {
        try {
            return await agent.LogOt.details(logOtId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchLogOtsStaffAsync = createAsyncThunk<LogOt[], number>(
    'logot/fetchLogOtsStaffAsync',
    async (staffId, thunkAPI) => {
        try {
            return await agent.LogOt.listOfStaff(staffId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const logotSlice = createSlice({
    name: 'logot',
    initialState: logOvertimesAdapter.getInitialState<LogOvertimeState>({
        filtersLoaded: false,
        logOtsLoaded: false,
        status: 'idle',
        logOtAdded: false,
    }),
    reducers: {
        setLogOvertimeAdded: (state, action) => {
            console.log("Initial State: ", state.logOtAdded)
            state.logOtAdded = action.payload;
        },
    },
    extraReducers: (builder => {
        //list
        builder.addCase(fetchLogOtsAsync.pending, (state) => {
            state.status = 'pendingFetchLogots'
        });
        builder.addCase(fetchLogOtsAsync.fulfilled, (state, action) => {
            logOvertimesAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.logOtsLoaded = true;
        });
        builder.addCase(fetchLogOtsAsync.rejected, state => {
            state.status = 'idle';
        })

        //list
        builder.addCase(fetchLogOtsStaffAsync.pending, (state) => {
            state.status = 'pendingFetchLogots'
        });
        builder.addCase(fetchLogOtsStaffAsync.fulfilled, (state, action) => {
            console.log("Here: ", action.payload);
            logOvertimesAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.logOtsLoaded = true;
        });
        builder.addCase(fetchLogOtsStaffAsync.rejected, state => {
            state.status = 'idle';
        })

        //details
        builder.addCase(fetchLogOtAsync.pending, (state) => {
            console.log("Here: ", state);

            state.status = 'pendingFetchLogot'
        });
        builder.addCase(fetchLogOtAsync.fulfilled, (state, action) => {
            console.log("Here: ", action.payload)
            logOvertimesAdapter.upsertOne(state, action.payload)
            state.status = 'idle';
            state.logOtsLoaded = true;
        });
        builder.addCase(fetchLogOtAsync.rejected, state => {
            // console.log("Here: ", state);

            state.status = 'idle';
        })
    })
})

export const { setLogOvertimeAdded } = logotSlice.actions;

export const logOvertimeSelectors = logOvertimesAdapter.getSelectors((state: RootState) => state.logot);