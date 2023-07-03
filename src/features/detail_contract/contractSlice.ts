import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Contract } from "../../app/models/contract";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const contractAdapter = createEntityAdapter<Contract>({
    selectId: contract => contract.contractId
});

export const fetchContractsAsync = createAsyncThunk<Contract[]>(
    'contracts/fetchContractsAsync',
    async (_, thunkAPI) =>{
        try{
            return await agent.Contract.list();
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchContractValidDetailASync = createAsyncThunk<Contract, number>(
    'contract/fetchValidContractAsync',
    async (staffId, thunkAPI)=>{
        try{
            return await agent.Contract.validDetails(staffId);

        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)


export const contractSlice = createSlice({
    name: 'contracts',
    initialState: contractAdapter.getInitialState({
        contractsLoaded: false,
        status: 'idle'
    }),
    reducers:{},
    extraReducers: (builder =>{
        //list
        builder.addCase(fetchContractsAsync.pending, (state) =>{
            state.status = 'pendingFetchContracts'
        });
        builder.addCase(fetchContractsAsync.fulfilled, (state, action) =>{
            contractAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.contractsLoaded = true;
        });
        builder.addCase(fetchContractsAsync.rejected, (state) =>{
            state.status = 'idle'
        });

        //validDetails 
        builder.addCase(fetchContractValidDetailASync.pending, (state) =>{
            state.status = 'pendingFetchValidContract'
        });
        builder.addCase(fetchContractValidDetailASync.fulfilled, (state, action)=>{
            contractAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.contractsLoaded = true;
        });
        builder.addCase(fetchContractValidDetailASync.rejected, (state) =>{
            state.status = 'idle';
        })
    })
})

export const contractSelectors = contractAdapter.getSelectors((state: RootState) => state.contract);