import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { UserInfor } from "../../models/userInfor";

interface EmployeeState {
    employeesLoaded: boolean;
    employees: UserInfor | null;
    status: string
  }

const employeesAdapter = createEntityAdapter<UserInfor>({
    selectId: (employee) => employee.staffId,
  });
  
  export const fetchEmployeesAsync = createAsyncThunk<UserInfor[], void, { state: RootState }>(
    "employee/fetchEmployeesAsync",
    async (_, thunkAPI) => {
      try {
        const response = await agent.Employees.list();
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
export const fetchEmployeeAsync = createAsyncThunk<UserInfor, number>(
    'employee/fetchEmployeeAsync',
    async(employeeId, thunkAPI) => {
      try{
        const employee = await agent.Employees.details(employeeId);
        return employee;
      }catch(error: any){
        return thunkAPI.rejectWithValue({error: error.data});
      }
    }
  )
  
  
  export const employeeSlice = createSlice({
      name: 'employees',
      initialState: employeesAdapter.getInitialState<EmployeeState>({
        employeesLoaded: false,
        employees: null,
        status: "idle"
      }),
      reducers: {},
      extraReducers: (builder => {
          builder.addCase(fetchEmployeesAsync.pending, (state) => {
              state.status = 'pendingFetchEmployees'
          });
          builder.addCase(fetchEmployeesAsync.fulfilled, (state,action) => {
              employeesAdapter.setAll(state,action.payload);
   
              state.status = 'idle';
              state.employeesLoaded = true;
          });
          builder.addCase(fetchEmployeesAsync.rejected, (state,action) => {
              console.log(action.payload);
              state.status = 'idle';
          });
          builder.addCase(fetchEmployeeAsync.pending, (state) => {
              state.status = 'pendingFetchEmployee'
          });
          builder.addCase(fetchEmployeeAsync.fulfilled, (state, action) => {
            employeesAdapter.upsertOne(state, action.payload);
   
            state.status = 'idle';
          });
          builder.addCase(fetchEmployeeAsync.rejected, (state,action) => {
            console.log(action);
            state.status = 'idle';
          })
      })
  })
  
  export const employeeSelectors = employeesAdapter.getSelectors((state: RootState) => state.employee)