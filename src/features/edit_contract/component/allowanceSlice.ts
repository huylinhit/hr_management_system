import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Allowance } from "../../../app/models/allowance";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";


const allowanceAdapter = createEntityAdapter<Allowance>({
    selectId: allowance => allowance.allowanceId
});

export const fetchAllowancesAsync = createAsyncThunk<Allowance[], void>(
    'allowances/fetchAllowancesAsync',
    async (_, thunkAPI) =>{
        try{
            return await agent.Allowance.list();
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data });
        }
    }
)


export const allowanceSlice = createSlice({
    name: 'payslips',
    initialState: allowanceAdapter.getInitialState({
        allowancesLoaded: false,
        status: 'idle'
    }),
    reducers:{},
    extraReducers: (builder =>{
        //list
        builder.addCase(fetchAllowancesAsync.pending, (state) =>{
            state.status = 'pendingFetchAllowancesAsync'
        });
        builder.addCase(fetchAllowancesAsync.fulfilled, (state, action) =>{
            allowanceAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.allowancesLoaded = true;
        });
        builder.addCase(fetchAllowancesAsync.rejected, (state) =>{
            state.status = 'idle';
        })
    })
})

export const allowanceSelect = allowanceAdapter.getSelectors((state: RootState) => state.allowance); 