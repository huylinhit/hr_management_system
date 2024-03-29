import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { AllowanceType } from "../../models/allowanceType";

interface AllowanceState {
    allowanceTypesLoaded: boolean;
    allowanceTypes: AllowanceType | null;
    allowanceTypeAdded: boolean;
    allowanceTypeUpdated: boolean,
    status: string
  }

const allowanceTypesAdapter = createEntityAdapter<AllowanceType>({
    selectId: (allowanceType) => allowanceType.allowanceTypeId,
  });
  
  export const fetchAllowanceTypesAsync = createAsyncThunk<AllowanceType[], void, { state: RootState }>(
    "employee/fetchAllowanceTypesAsync",
    async (_, thunkAPI) => {
      try {
        const response = await agent.AllowanceType.list();
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
  export const allowanceTypeSlice = createSlice({
      name: 'allowanceType',
      initialState: allowanceTypesAdapter.getInitialState<AllowanceState>({
        allowanceTypesLoaded: false,
        allowanceTypes: null,
        allowanceTypeAdded: false,
        allowanceTypeUpdated: false,
        status: "idle"
      }),
      reducers: {
        setAllowanceTypeAdded: (state, action) => {
          state.allowanceTypeAdded = action.payload;
        },
        setAllowanceTypeUpdated: (state, action) => {
          state.allowanceTypeUpdated = action.payload;
        },
      },
      extraReducers: (builder => {
          builder.addCase(fetchAllowanceTypesAsync.pending, (state) => {
              state.status = 'pendingFetchAllowanceTypes'
          });
          builder.addCase(fetchAllowanceTypesAsync.fulfilled, (state,action) => {
            allowanceTypesAdapter.setAll(state,action.payload);
   
              state.status = 'idle';
              state.allowanceTypesLoaded = true;
          });
          builder.addCase(fetchAllowanceTypesAsync.rejected, (state,action) => {
              console.log(action.payload);
              state.status = 'idle';
          });
      })
  })
  
  export const { setAllowanceTypeAdded, setAllowanceTypeUpdated } = allowanceTypeSlice.actions;
  export const allowanceTypeSelectors = allowanceTypesAdapter.getSelectors((state: RootState) => state.allowanceType)