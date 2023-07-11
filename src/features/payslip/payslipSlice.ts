import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Payslip } from "../../app/models/payslip";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";


const payslipAdapter = createEntityAdapter<Payslip>({
    selectId: payslip => payslip.payslipId
});

export const fetchPayslipsAsync = createAsyncThunk<Payslip[]>(
    'payslips/fetchPayslipsAsync',
    async (_, thunkAPI) =>{
        try{
            return await agent.Payslip.list();
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data });
        }
    }
)

export  const fetchPayslipsStaffAsync = createAsyncThunk<Payslip[], number>(
    'payslips/fetchPayslipsStaffAsync',
    async(staffId, thunkAPI) =>{
        try{
            return await agent.Payslip.listOfStaff(staffId);
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)


export const fetchPayslipAsync = createAsyncThunk<Payslip, {payslipId: number, staffId: number}>(
    'payslips/fetchPayslipAsync',
    async ( {payslipId, staffId}, thunkAPI) =>{
        try{
            return await agent.Payslip.details(payslipId, staffId)
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)


export const payslipSlice = createSlice({
    name: 'payslips',
    initialState: payslipAdapter.getInitialState({
        payslipsLoaded: false,
        status: 'idle'
    }),
    reducers:{},
    extraReducers: (builder =>{
        //list
        builder.addCase(fetchPayslipsAsync.pending, (state) =>{
            state.status = 'pendingFetchPayslips'
        });
        builder.addCase(fetchPayslipsAsync.fulfilled, (state, action) =>{
            payslipAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.payslipsLoaded = true;
        });
        builder.addCase(fetchPayslipsAsync.rejected, (state) =>{
            state.status = 'idle';
        })

        //list payslips of Staff
        builder.addCase(fetchPayslipsStaffAsync.pending, (state) =>{
            state.status = 'pendingFetchPayslips'
        });
        builder.addCase(fetchPayslipsStaffAsync.fulfilled, (state, action) =>{
            payslipAdapter.upsertMany(state, action.payload)
            state.status = 'idle';
            state.payslipsLoaded = true;
        });
        builder.addCase(fetchPayslipsStaffAsync.rejected, (state) =>{
            state.status = 'idle';
        })

        //details
        builder.addCase(fetchPayslipAsync.pending, (state) =>{
            state.status = 'pendingFetchPayslip'
        });
        builder.addCase(fetchPayslipAsync.fulfilled, (state, action) =>{
            payslipAdapter.upsertOne(state, action.payload);
            state.status ='idle';
            state.payslipsLoaded = true;
        });
        builder.addCase(fetchPayslipAsync.rejected, (state) =>{
            state.status ='idle';
        })
    })
})

export const payslipSelectors = payslipAdapter.getSelectors((state: RootState) => state.payslip); 