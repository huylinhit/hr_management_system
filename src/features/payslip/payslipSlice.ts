import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Payslip, PayslipParams } from "../../app/models/payslip";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface PayslipState {
    payslipsLoaded: boolean,
    filtersLoaded: boolean,
    status: string,
    departments: string[],
    payslipParams: PayslipParams,
    metaData: MetaData | null;
}


const payslipAdapter = createEntityAdapter<Payslip>({
    selectId: payslip => payslip.payslipId
});

function getAxiosParams(payslipParams: PayslipParams) {
    const params = new URLSearchParams();

    params.append('pageNumber', payslipParams.pageNumber.toString());
    // params.append('pageSize', payslipParams.pageSize.toString());
    params.append('orderBy', payslipParams.orderBy);


    if (payslipParams.searchTerm) params.append('searchTerm', payslipParams.searchTerm.toString());
    if (payslipParams.departments?.length > 0) params.append('departments', payslipParams.departments.toString());
    
    return params;
}

export const fetchPayslipsAsync = createAsyncThunk<Payslip[], void, { state: RootState }>(
    'payslips/fetchPayslipsAsync',
    async (_, thunkAPI) => {

        const params = getAxiosParams(thunkAPI.getState().payslip.payslipParams);
        try {
            const response = await agent.Payslip.list(params);
            
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response.items;

        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchPayslipsStaffAsync = createAsyncThunk<Payslip[], number>(
    'payslips/fetchPayslipsStaffAsync',
    async (staffId, thunkAPI) => {
        try {
            return await agent.Payslip.listOfStaff(staffId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)


export const fetchPayslipAsync = createAsyncThunk<Payslip, { payslipId: number, staffId: number }>(
    'payslips/fetchPayslipAsync',
    async ({ payslipId, staffId }, thunkAPI) => {
        try {
            return await agent.Payslip.details(payslipId, staffId)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchFiltersPayslips = createAsyncThunk(
    'payslips/fetchFiltersPayslips',
    async (_, thunkAPI) => {
        try {
            return agent.Payslip.filters()
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 30,
        orderBy: "payslipIdDesc",
        departments: []
    }
}

export const payslipSlice = createSlice({
    name: 'payslips',
    initialState: payslipAdapter.getInitialState<PayslipState>({
        payslipsLoaded: false,
        status: 'idle',
        filtersLoaded: false,
        departments: [],
        payslipParams: initParams(),
        metaData: null
    }),
    reducers: {
        setPayslipParams: (state, action) => {
            state.payslipsLoaded = false;
            state.payslipParams = { ...state.payslipParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.payslipsLoaded = false;
            state.payslipParams = { ...state, ...action.payload }
        },
        resetPayslipParams: (state) => {
            state.payslipsLoaded = false;
            state.payslipParams = initParams();
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        }
    },
    extraReducers: (builder => {
        //list
        builder.addCase(fetchPayslipsAsync.pending, (state) => {
            state.status = 'pendingFetchPayslips'
        });
        builder.addCase(fetchPayslipsAsync.fulfilled, (state, action) => {
            payslipAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.payslipsLoaded = true;
        });
        builder.addCase(fetchPayslipsAsync.rejected, (state) => {
            state.status = 'idle';
        })

        //list payslips of Staff
        builder.addCase(fetchPayslipsStaffAsync.pending, (state) => {
            state.status = 'pendingFetchPayslips'
        });
        builder.addCase(fetchPayslipsStaffAsync.fulfilled, (state, action) => {
            payslipAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.payslipsLoaded = true;
        });
        builder.addCase(fetchPayslipsStaffAsync.rejected, (state) => {
            state.status = 'idle';
        })

        //details
        builder.addCase(fetchPayslipAsync.pending, (state) => {
            state.status = 'pendingFetchPayslip'
        });
        builder.addCase(fetchPayslipAsync.fulfilled, (state, action) => {
            payslipAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.payslipsLoaded = true;
        });
        builder.addCase(fetchPayslipAsync.rejected, (state) => {
            state.status = 'idle';
        })

        builder.addCase(fetchFiltersPayslips.pending, (state) => {
            state.status = "pendingFetchFilterPayslips"
        })
        builder.addCase(fetchFiltersPayslips.fulfilled, (state, action) => {
            state.departments = action.payload;
            state.status = 'idle'
            state.filtersLoaded = true;
        })
        builder.addCase(fetchFiltersPayslips.rejected, (state, action) => {
            state.status = 'idle'
        })
    })
})

export const { setPayslipParams, resetPayslipParams, setMetaData, setPageNumber } = payslipSlice.actions;

export const payslipSelectors = payslipAdapter.getSelectors((state: RootState) => state.payslip); 