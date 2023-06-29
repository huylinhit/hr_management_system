import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { Contract } from "../../models/contract";

interface ContractState {
    contractsLoaded: boolean;
    contracts: Contract | null;
    status: string
  }

const contractsAdapter = createEntityAdapter<Contract>({
    selectId: (contract) => contract.contractId,
  });
  
  export const fetchContractsAsync = createAsyncThunk<Contract[], void, { state: RootState }>(
    "contract/fetchContractsAsync",
    async (_, thunkAPI) => {
      try {
        const response = await agent.Contract.list();
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
export const fetchContractAsync = createAsyncThunk<Contract, number>(
    'employee/fetchContractAsync',
    async(contractId, thunkAPI) => {
      try{
        const contract = await agent.Contract.details(contractId);
        return contract;
      }catch(error: any){
        return thunkAPI.rejectWithValue({error: error.data});
      }
    }
  )
  
  
  export const contractSlice = createSlice({
      name: 'contracts',
      initialState: contractsAdapter.getInitialState<ContractState>({
        contractsLoaded: false,
        contracts: null,
        status: "idle"
      }),
      reducers: {},
      extraReducers: (builder => {
          builder.addCase(fetchContractsAsync.pending, (state) => {
              state.status = 'pendingFetchContracts'
          });
          builder.addCase(fetchContractsAsync.fulfilled, (state,action) => {
            contractsAdapter.setAll(state,action.payload);
   
              state.status = 'idle';
              state.contractsLoaded = true;
          });
          builder.addCase(fetchContractsAsync.rejected, (state,action) => {
              console.log(action.payload);
              state.status = 'idle';
          });
          builder.addCase(fetchContractAsync.pending, (state) => {
              state.status = 'pendingFetchContract'
          });
          builder.addCase(fetchContractAsync.fulfilled, (state, action) => {
            contractsAdapter.upsertOne(state, action.payload);
   
            state.status = 'idle';
          });
          builder.addCase(fetchContractAsync.rejected, (state,action) => {
            console.log(action);
            state.status = 'idle';
          })
      })
  })
  
  export const employeeSelectors = contractsAdapter.getSelectors((state: RootState) => state.contract)