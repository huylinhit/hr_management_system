import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { LogOt, LogOtParams } from "../../app/models/logOt";
import { MetaData } from "../../app/models/pagination";

interface LogOvertimeState {
    logOtsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    logOtAdded: boolean;
    departments: string[],
    logotParams: LogOtParams,
    metaData: MetaData | null;
}

const logOvertimesAdapter = createEntityAdapter<LogOt>({
    selectId: logot => logot.otLogId
})


function getAxiosParams(logotParams: LogOtParams) {
    const params = new URLSearchParams();

    params.append('pageNumber', logotParams.pageNumber.toString());
    // params.append('pageSize', logotParams.pageSize.toString());
    // params.append('orderBy', logotParams.orderBy);

    if (logotParams.pageSize) params.append('pageSize', logotParams.pageSize.toString());
    if (logotParams.searchTerm) params.append('searchTerm', logotParams.searchTerm.toString());
    if (logotParams.departments?.length > 0) params.append('departments', logotParams.departments.toString());

    return params;
}


export const fetchLogOtsAsync = createAsyncThunk<LogOt[], void, {state: RootState}>(
    'logot/fetchLogOtsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().logot.logotParams);
        try {
            const response =  await agent.LogOt.list(params);
            thunkAPI.dispatch(setLogotMetaData(response.metaData))
            return response.items;

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

export const fetchFiltersLogOts = createAsyncThunk(
    'logot/fetchFiltersLogots',
    async (_, thunkAPI) => {
        try {
            const response =  agent.LogOt.filters()
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

export const logotSlice = createSlice({
    name: 'logot',
    initialState: logOvertimesAdapter.getInitialState<LogOvertimeState>({
        filtersLoaded: false,
        logOtsLoaded: false,
        status: 'idle',
        logOtAdded: false,
        departments: [],
        logotParams: initParams(),
        metaData: null
    }),
    reducers: {
        setLogOvertimeAdded: (state, action) => {
            state.logOtAdded = action.payload;
        },
        setLogotParams: (state, action) => {
            state.logOtsLoaded = false;
            state.logotParams = { ...state.logotParams, ...action.payload, pageNumber: 1 }
          },
          setPageNumber: (state, action) => {
            state.logOtsLoaded = false;
            state.logotParams = { ...state, ...action.payload }
          },
          resetlogotParams: (state) => {
            state.logOtsLoaded = false;
            state.logotParams = initParams();
          },
          setLogotMetaData: (state, action) => {
            state.metaData = action.payload;
          },
          setPageSize: (state, action) =>{
            console.log("state: ", state);
            console.log("Action: ", action);
          }
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

            logOvertimesAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.logOtsLoaded = true;
        });
        builder.addCase(fetchLogOtsStaffAsync.rejected, state => {
            state.status = 'idle';
        })

        //details
        builder.addCase(fetchLogOtAsync.pending, (state) => {


            state.status = 'pendingFetchLogot'
        });
        builder.addCase(fetchLogOtAsync.fulfilled, (state, action) => {

            logOvertimesAdapter.upsertOne(state, action.payload)
            state.status = 'idle';
            state.logOtsLoaded = true;
        });
        builder.addCase(fetchLogOtAsync.rejected, state => {
            state.status = 'idle';
        })

        //Filter
        builder.addCase(fetchFiltersLogOts.pending, (state) => {
            state.status = "pendingFetchFilterLogOts"
          })
          builder.addCase(fetchFiltersLogOts.fulfilled, (state, action) => {
            
            state.departments = action.payload;
            state.status = 'idle'
            state.filtersLoaded = true;
          })
          builder.addCase(fetchFiltersLogOts.rejected, (state, action) => {
            state.status = 'idle'
          })
    })
})

export const { setLogOvertimeAdded, setLogotMetaData, setPageNumber, setLogotParams, resetlogotParams, setPageSize } = logotSlice.actions;

export const logOvertimeSelectors = logOvertimesAdapter.getSelectors((state: RootState) => state.logot);