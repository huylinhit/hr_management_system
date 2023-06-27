import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../models/employee";
import { RootState } from "../configureStore";
import agent from "../../api/agent";

interface EmployeeState {
    employeesLoaded: boolean;
    employees: Employee | null;
    status: string
  }

const employeesAdapter = createEntityAdapter<Employee>({
    selectId: (employee) => employee.staffId,
  });
  
  export const fetchEmployeesAsync = createAsyncThunk<Employee[], void, { state: RootState }>(
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
  
  
export const fetchEmployeeAsync = createAsyncThunk<Employee, number>(
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
              state.status = 'pendingFetchDepartments'
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
              state.status = 'pendingFetchDepartment'
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
  
  export const departmentSelectors = employeesAdapter.getSelectors((state: RootState) => state.employee)