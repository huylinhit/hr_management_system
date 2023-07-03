import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { LogOt } from "../../app/models/logOt";


const logOvertimesAdapter = createEntityAdapter<LogOt>({
    selectId: logot => logot.otLogId
})

export const fetchLogOtsAsync = createAsyncThunk<LogOt[]>(
    'logot/fetchLogOtsAsync',
    async (_, thunkAPI) =>{
        try{
            return await agent.LogOt.list();
        }catch(error: any)
        {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchLogOtAsync = createAsyncThunk<LogOt, { logOtId: number }>(
    'logot/fetchLogosAsync',
    async ({ logOtId }, thunkAPI) => {
        try {
            return await agent.LogOt.details(logOtId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const logotSlice = createSlice({
    name: 'logot',
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