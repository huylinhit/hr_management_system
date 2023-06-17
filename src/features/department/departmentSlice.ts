import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Department } from "../../app/models/department";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface DepartmentState{
    departmentsLoaded: boolean;
    staffsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
}

const departmentsAdapter = createEntityAdapter<Department>();


export const fetchDepartmentsAsync = createAsyncThunk<Department[], void, { state: RootState }>(
    'department/fetchDepartmentsAsync',
    async (_, thunkAPI) => {
      try {
        const response = await agent.Department.list();
  
        // Map the response items to include the id property
        const departmentsWithId = response.map((department: Department, index: number) => ({
          id: index + 1, // Generate a unique id
          departmentId: department.departmentId,
          departmentName: department.departmentName,
          manager: department.manager,
          numberOfStaff: department.numberOfStaff,
          managerPhone: department.managerPhone,
          managerMail: department.managerMail
        }));
  
        return departmentsWithId;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  

export const departmentSlice = createSlice({
    name: 'department',
    initialState: departmentsAdapter.getInitialState<DepartmentState>({
        departmentsLoaded: false,
        staffsLoaded: false,
        filtersLoaded: false,
        status:'idle',
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchDepartmentsAsync.pending, (state) => {
            state.status = 'pendingFetchDepartments'
        });
        builder.addCase(fetchDepartmentsAsync.fulfilled, (state,action) => {
            departmentsAdapter.setAll(state,action.payload);
            console.log(action.payload);
            state.status = 'idle';
            state.departmentsLoaded = true;
        });
        builder.addCase(fetchDepartmentsAsync.rejected, (state,action) => {
            console.log(action.payload);
            state.status = 'idle';
        })
    })
})

export const departmentSelectors = departmentsAdapter.getSelectors((state: RootState) => state.department)