import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import Contract from "../../models/contract";

interface ContractState {
  contractsLoaded: boolean;
  contractAdded: boolean;
  status: string
}

const contractAdapter = createEntityAdapter<Contract>({
  selectId: (contract) => contract.staffId,
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

export const fetchContractValidDetailASync = createAsyncThunk<Contract, number>(
  'contract/fetchValidContractAsync',
  async (staffId, thunkAPI) => {
    try {
      return await agent.Contract.validDetails(staffId);

    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

export const fetchContractAsync = createAsyncThunk<Contract, number>(
  'contract/fetchContractAsync',
  async (staffId, thunkAPI) => {
    try {
      const contract = await agent.Contract.details(staffId);
      return contract;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)


export const contractSlice = createSlice({
  name: 'contracts',
  initialState: contractAdapter.getInitialState<ContractState>({
    contractsLoaded: false,
    contractAdded: false,
    status: "idle"
  }),
  reducers: {},
  extraReducers: (builder => {
    // List
    builder.addCase(fetchContractsAsync.pending, (state) => {
      state.status = 'pendingFetchContracts'
    });
    builder.addCase(fetchContractsAsync.fulfilled, (state, action) => {
      contractAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.contractsLoaded = true;
    });
    builder.addCase(fetchContractsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });


    //validDetails 
    builder.addCase(fetchContractValidDetailASync.pending, (state) => {
      state.status = 'pendingFetchValidContract'
    });
    builder.addCase(fetchContractValidDetailASync.fulfilled, (state, action) => {
      contractAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
      state.contractsLoaded = true;
    });
    builder.addCase(fetchContractValidDetailASync.rejected, (state) => {
      state.status = 'idle';
    })

    //Details 
    builder.addCase(fetchContractAsync.pending, (state) => {
      state.status = 'pendingFetchContract'
    });
    builder.addCase(fetchContractAsync.fulfilled, (state, action) => {
      contractAdapter.upsertOne(state, action.payload);

      state.status = 'idle';
    });
    builder.addCase(fetchContractAsync.rejected, (state) => {
      state.status = 'idle';
    })
  })
})

export const contractSelectors = contractAdapter.getSelectors((state: RootState) => state.contract)