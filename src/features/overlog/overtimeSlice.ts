import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LogOT } from "../../app/models/LogOT";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";


const logOvertimesAdapter = createEntityAdapter<LogOT>({
    selectId: logot => logot.otLogId
})

export const fetchLogOtAsync = createAsyncThunk<LogOT, { logOtId: number }>(
    'logots/fetchLogosAsync',
    async ({ logOtId }, thunkAPI) => {
        try {
            return await agent.LogOt.details(logOtId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const logotSlice = createSlice({
    name: 'logots',
    initialState: logOvertimesAdapter.getInitialState({
        logOtLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder =>{
        //details
        builder.addCase(fetchLogOtAsync.pending, (state) =>{
            state.status = 'pendinngFetchLogot'
        });
        builder.addCase(fetchLogOtAsync.fulfilled, (state, action) =>{
            logOvertimesAdapter.upsertOne(state, action.payload)
            state.status = 'idle';
            state.logOtLoaded = true;
        });
        builder.addCase(fetchLogOtAsync.rejected, state =>{
            state.status = 'idle';
        })
    })
})

export const logOvertimeSelectors = logOvertimesAdapter.getSelectors((state: RootState) => state.logot);