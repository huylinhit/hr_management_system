import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import Contract, { ContractParams } from "../../models/contract";
import { MetaData } from "../../models/pagination";

interface ContractState {
  contractsLoaded: boolean;
  contractAdded: boolean;
  contractUpdated: boolean,
  contracts: Contract | null;
  filtersLoaded: boolean;
  status: string;
  departments: string[],
  contractParams: ContractParams,
  metaData: MetaData | null;
}

const contractAdapter = createEntityAdapter<Contract>({
  selectId: contract => contract.contractId,
});


function getAxiosParams(contractParams: ContractParams) {
  const params = new URLSearchParams();

  params.append('pageNumber', contractParams.pageNumber.toString());
  // params.append('pageSize', contractParams.pageSize.toString());
  // params.append('orderBy', contractParams.orderBy);
  if (contractParams.searchTerm) params.append('searchTerm', contractParams.searchTerm.toString());
  if (contractParams.departments?.length > 0) params.append('departments', contractParams.departments.toString());

  return params;
}


export const fetchContractsAsync = createAsyncThunk<Contract[], void, { state: RootState }>(
  "contract/fetchContractsAsync",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().contract.contractParams);
    try {
      const response = await agent.Contract.list(params);
      thunkAPI.dispatch(setContractMetaData(response.metaData))
            return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const fetchFiltersContracts = createAsyncThunk(
  'contract/fetchFiltersContracts',
  async (_, thunkAPI) => {
    try {
      const response = agent.Contract.filters()
      return response;
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)


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
      return await agent.Contract.details(staffId);

    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
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
export const contractSlice = createSlice({
  name: 'contracts',
  initialState: contractAdapter.getInitialState<ContractState>({
    contractsLoaded: false,
    contractAdded: false,
    contractUpdated: false,
    filtersLoaded: false,
    contracts: null,
    status: "idle",
    departments: [],
    contractParams: initParams(),
    metaData: null
  }),
  reducers: {
    setContractAdded: (state, action) => {
      state.contractAdded = action.payload;
    },
    setContractUpdated: (state, action) => {
      state.contractUpdated = action.payload;
    },
    setContractLoaded: (state, action) => {
      state.contractsLoaded = false
    },
    setContractParams: (state, action) => {
      state.contractsLoaded = false;
      state.contractParams = { ...state.contractParams, ...action.payload, pageNumber: 1 }
    },
    setPageNumber: (state, action) => {
      state.contractsLoaded = false;
      state.contractParams = { ...state, ...action.payload }
    },
    resetcontractParams: (state) => {
      state.contractsLoaded = false;
      state.contractParams = initParams();
    },
    setContractMetaData: (state, action) => {
      state.metaData = action.payload;
    }
  },
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

    //Filter
    builder.addCase(fetchFiltersContracts.pending, (state) => {
      state.status = "pendingFetchFilterLogOts"
    })
    builder.addCase(fetchFiltersContracts.fulfilled, (state, action) => {

      state.departments = action.payload;
      state.status = 'idle'
      state.filtersLoaded = true;
    })
    builder.addCase(fetchFiltersContracts.rejected, (state, action) => {
      state.status = 'idle'
    })
  })
})

export const { setContractMetaData, setContractParams, setPageNumber, setContractAdded, setContractUpdated, setContractLoaded } = contractSlice.actions;
export const contractSelectors = contractAdapter.getSelectors((state: RootState) => state.contract)